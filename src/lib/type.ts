export type User = {
  id: string;
  email: string;
  password?: string;
  full_name: string;
  job: string;
  phone_number: number | null;
  family_number: number | null;
  gender: string;
  country: string;
  regional: string;
  village: string;
  address: string;
  background_story: string;
  category: string[] | string;
  prove_of_identity: string[] | string;
  prove_of_income: string;
  additional_document: string[] | string;
  updated_at: string;
  cheqd_did: string;
  aid_tags?: string[] | string;
};

export type VerifiableCredential = {
  id?: string;
  user_id: string;
  type: string;
  vc_json: JSON;
  status: string;
};

// types.ts (Optional: Define types for better type safety)

export type AidDetails = {
  name: string;
  about: string;
  description:string;
  amount: number;
  amountUnit: string;
  tags: string[];
  approvalRate?: number;
  flagSrc?: string; // Path to flag image
  logoSrc?: string; // Path to organization logo
};

export type StatusDetails = {
  status: 'Approved' | 'Pending' | 'Rejected' | string; // Atau status lain
  description: string;
};

export type TimelineEntry = {
  id: string;
  date: string;
  description: string;
  timestamp: string; // e.g., "11.01 WIB"
};

export type ConfirmationIcons = {
  id: string;
  iconSrc?: string; // Path to icon image (or use icon components)
  isCompleted?: boolean; // Status for coloring/visuals
};