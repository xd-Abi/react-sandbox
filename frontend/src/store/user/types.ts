export type SignUpStateType = {
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  fullname?: string | undefined;
  birthdate?: Date | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  postcode?: string | undefined;
  country?: string | undefined;
  isTermsAndConditionsAccepted?: boolean | undefined;
  idConfirmationFile: File;
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
  birthdate: Date;
  email: string;
  phoneNumber: string;
};

export type VerificationChangeType = {
  isTermsAndConditionsAccepted: boolean;
  idConfirmationFile: File;
};
