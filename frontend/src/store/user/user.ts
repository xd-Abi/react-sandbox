import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  AccountInfoChangeType,
  PersonalInfoChangeType,
  ResidenceChangeType,
  SignUpState,
  VerificationChangeType,
} from "./types";

export const SignUpSlice = createSlice({
  name: "signUp",
  initialState: {} as SignUpState,
  reducers: {
    accountInfoChange: (
      state,
      action: PayloadAction<AccountInfoChangeType>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    residenceChange: (state, action: PayloadAction<ResidenceChangeType>) => {
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.postcode = action.payload.postcode;
      state.country = action.payload.country;
    },
    personalInfoChange: (
      state,
      action: PayloadAction<PersonalInfoChangeType>
    ) => {
      state.fullname = action.payload.fullname;
      state.birthdate = action.payload.birthdate;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
    verificationChange: (
      state,
      action: PayloadAction<VerificationChangeType>
    ) => {
      state.isTermsAndConditionsAccepted =
        action.payload.isTermsAndConditionsAccepted;
    },
  },
});

const SignUpReducer = SignUpSlice.reducer;

export const {
  accountInfoChange,
  residenceChange,
  personalInfoChange,
  verificationChange,
} = SignUpSlice.actions;

export {SignUpReducer};
