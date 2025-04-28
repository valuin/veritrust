import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase auth error:", error.message);

      // Memberikan pesan error yang lebih user-friendly
      let errorMessage = "Login gagal";

      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email atau password salah";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Email belum dikonfirmasi. Silakan cek email Anda";
      }

      return NextResponse.json(
        { error: errorMessage, details: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login berhasil",
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Server error during login:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
