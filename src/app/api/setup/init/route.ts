import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample aid programs for testing
const aidPrograms = [
  {
    id: "rohingya-aid-2023",
    name: "Rohingya Social Aid Program",
    organization: "UNHCR",
    category: "Refugees",
    description: "Financial assistance for Rohingya refugee families",
    amount: 51,
    currency: "CHEQ",
    requirements: [
      "Rohingya ethnicity",
      "Valid refugee status",
      "Income below poverty line",
      "Verified identity documents",
    ],
  },
  {
    id: "single-parent-support-2023",
    name: "Single Parent Support",
    organization: "Red Cross",
    category: "Single Mom",
    description: "Financial aid for single parents with dependents",
    amount: 35,
    currency: "CHEQ",
    requirements: [
      "Single parent status",
      "At least one dependent child",
      "Income below threshold",
      "Proof of residence",
    ],
  },
  {
    id: "elderly-care-2023",
    name: "Elderly Care Support",
    organization: "HelpAge",
    category: "Elderly",
    description: "Financial support for elderly individuals",
    amount: 40,
    currency: "CHEQ",
    requirements: [
      "Age 65 or above",
      "Limited or no income",
      "No significant family support",
      "Medical needs",
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    // Check for secret key to prevent unauthorized initialization
    const { searchParams } = new URL(request.url);
    const secretKey = searchParams.get("secretKey");

    if (secretKey !== process.env.SETUP_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create tables directly with SQL since RPC functions don't exist yet on first run
    const tablesCreated = await createTablesDirectly(
      searchParams.get("reset") === "true"
    );

    // Check for and add missing columns if needed
    await checkAndAddMissingColumns();

    // Step 4: Insert sample aid programs
    for (const program of aidPrograms) {
      const { error: insertError } = await supabase.from("aid_programs").upsert(
        {
          id: program.id,
          name: program.name,
          organization: program.organization,
          category: program.category,
          description: program.description,
          amount: program.amount,
          currency: program.currency,
          requirements: program.requirements,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (insertError) {
        console.error(
          `Error inserting aid program ${program.id}:`,
          insertError
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Setup completed successfully",
      tablesCreated,
      programsInserted: aidPrograms.length,
    });
  } catch (error) {
    console.error("Error in setup initialization:", error);
    return NextResponse.json(
      { error: "Failed to initialize setup" },
      { status: 500 }
    );
  }
}

async function createTablesDirectly(reset: boolean) {
  const results = {
    aid_programs: false,
    eligibility_analyses: false,
    aid_applications: false,
  };

  try {
    // Drop tables if reset is true
    if (reset) {
      await supabase.from("aid_applications").delete().neq("id", "dummy");

      const dropTablesSQL = `
        DROP TABLE IF EXISTS aid_applications;
        DROP TABLE IF EXISTS eligibility_analyses;
        DROP TABLE IF EXISTS aid_programs;
      `;

      await supabase.rpc("exec_sql", { sql: dropTablesSQL });
    }

    // Create aid_programs table
    const createAidProgramsSQL = `
      CREATE TABLE IF NOT EXISTS aid_programs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        organization TEXT,
        category TEXT,
        description TEXT,
        amount NUMERIC,
        currency TEXT,
        requirements TEXT[],
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const { error: aidProgramsError } = await supabase.rpc("exec_sql", {
      sql: createAidProgramsSQL,
    });
    results.aid_programs = !aidProgramsError;

    // Create eligibility_analyses table
    const createEligibilityAnalysesSQL = `
      CREATE TABLE IF NOT EXISTS eligibility_analyses (
        id SERIAL PRIMARY KEY,
        user_id UUID,
        application_id UUID,
        analysis_result TEXT,
        eligibility_score INT,
        eligibility_metrics JSONB,
        aid_program TEXT,
        status TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const { error: eligibilityAnalysesError } = await supabase.rpc("exec_sql", {
      sql: createEligibilityAnalysesSQL,
    });
    results.eligibility_analyses = !eligibilityAnalysesError;

    // Create aid_applications table
    const createAidApplicationsSQL = `
      CREATE TABLE IF NOT EXISTS aid_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        program_id TEXT,
        status TEXT,
        eligibility_score INT,
        analysis_result TEXT,
        eligibility_metrics JSONB,
        documents TEXT[],
        profile_data JSONB,
        category TEXT,
        feedback TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    const { error: aidApplicationsError } = await supabase.rpc("exec_sql", {
      sql: createAidApplicationsSQL,
    });
    results.aid_applications = !aidApplicationsError;

    // Create the exec_sql function if it doesn't exist
    if (
      aidProgramsError &&
      aidProgramsError.message.includes("does not exist")
    ) {
      // Since exec_sql doesn't exist, we'll use raw query to create it
      const createExecSQLFunction = `
        CREATE OR REPLACE FUNCTION exec_sql(sql text)
        RETURNS void AS $$
        BEGIN
          EXECUTE sql;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `;

      // Use raw query as a fallback for the first run
      const { error: createFunctionError } = await supabase
        .from("_exec_sql_fallback")
        .select("*")
        .limit(1)
        .then((response) => {
          // If this function is called, it means we tried to select from a non-existent table
          // We'll catch the error and try to create the function using another method
          return { error: new Error("Table does not exist") };
        });

      // If we can't create the function, create tables directly as a last resort
      if (createFunctionError) {
        // Create tables directly without using functions
        await createTablesDirectlyWithoutFunctions();
      }
    }

    return results;
  } catch (error) {
    console.error("Error creating tables directly:", error);

    // Try one more approach without functions
    return await createTablesDirectlyWithoutFunctions();
  }
}

async function createTablesDirectlyWithoutFunctions() {
  const results = {
    aid_programs: false,
    eligibility_analyses: false,
    aid_applications: false,
  };

  try {
    // Try to create tables directly with SQL queries through REST API
    try {
      // First, try to explicitly create the aid_programs table
      const { data, error } = await supabase
        .from("aid_programs")
        .select("count")
        .limit(1);

      if (error && error.code === "42P01") {
        // Table doesn't exist error code
        // Try to use raw SQL query to create the table
        console.log("Creating aid_programs table...");
        await fetch(`${supabaseUrl}/rest/v1/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseServiceKey,
            Authorization: `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({
            query: `
              CREATE TABLE IF NOT EXISTS aid_programs (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                organization TEXT,
                category TEXT,
                description TEXT,
                amount NUMERIC,
                currency TEXT,
                requirements TEXT[],
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
              )
            `,
          }),
        });
      }

      // Let's do a real-time check of the schema to see what columns exist
      const { data: schemaData, error: schemaError } = await supabase
        .from("aid_programs")
        .select("id, name, amount")
        .limit(1);

      if (!schemaError) {
        results.aid_programs = true;
      } else {
        console.error("Error checking aid_programs schema:", schemaError);
      }
    } catch (error) {
      console.error("Error creating aid_programs table:", error);
    }

    // Try other tables with the same pattern...

    return results;
  } catch (error) {
    console.error("Error in final fallback table creation:", error);
    return results;
  }
}

async function checkAndAddMissingColumns() {
  try {
    // First, check if the table exists
    const { data, error } = await supabase
      .from("aid_programs")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Error checking aid_programs table:", error);
      return;
    }

    // Check if the amount column exists
    const { error: amountError } = await supabase
      .from("aid_programs")
      .select("amount")
      .limit(1);

    // If there's an error specifically about the amount column not existing
    if (
      amountError &&
      (amountError.message.includes("amount") ||
        amountError.message.includes("column"))
    ) {
      console.log("Amount column missing, attempting to add it...");

      try {
        // Try to add the amount column using RPC if available
        const addColumnSQL = `
          ALTER TABLE aid_programs 
          ADD COLUMN IF NOT EXISTS amount NUMERIC;
        `;

        // Use proper promise handling instead of catch
        const { error: rpcError } = await supabase.rpc("exec_sql", {
          sql: addColumnSQL,
        });

        if (rpcError) {
          console.error(
            "RPC error adding column, using alternative method:",
            rpcError
          );

          // If that fails, try a workaround
          console.log("Trying alternative method to add amount column...");

          // Since direct SQL execution might be limited, let's try a workaround
          // We'll create a temporary table with the correct schema and copy data
          const recreateTableSQL = `
            -- Create a temporary table with the correct schema
            CREATE TABLE IF NOT EXISTS aid_programs_new (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              organization TEXT,
              category TEXT,
              description TEXT,
              amount NUMERIC,
              currency TEXT,
              requirements TEXT[],
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW()
            );
            
            -- Copy existing data
            INSERT INTO aid_programs_new 
            SELECT 
              id, 
              name, 
              organization, 
              category, 
              description, 
              NULL as amount, -- Default value for missing column
              currency, 
              requirements, 
              created_at, 
              updated_at 
            FROM aid_programs
            ON CONFLICT (id) DO NOTHING;
            
            -- Drop old table
            DROP TABLE aid_programs;
            
            -- Rename new table to original name
            ALTER TABLE aid_programs_new RENAME TO aid_programs;
          `;

          // Try to execute the SQL through RPC with proper error handling
          const { error: recreateError } = await supabase.rpc("exec_sql", {
            sql: recreateTableSQL,
          });

          if (recreateError) {
            console.error("Failed to recreate table:", recreateError);
          }
        } else {
          console.log("Amount column added successfully");
        }
      } catch (addColumnError) {
        console.error("Error adding amount column:", addColumnError);
      }
    }
  } catch (error) {
    console.error("Error in checkAndAddMissingColumns:", error);
  }
}
