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
