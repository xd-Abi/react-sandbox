export type SignUpState = {
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  fullname?: string | undefined;
  birthdate?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  postcode?: string | undefined;
  country?: string | undefined;
  isTermsAndConditionsAccepted?: boolean | undefined;
};

export type AccountInfoChangeType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type ResidenceChangeType = {
  address: string;
  city: string;
  postcode: string;
  country: string;
};

export type PersonalInfoChangeType = {
  fullname: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
};

export type VerificationChangeType = {
  isTermsAndConditionsAccepted: boolean;
};
