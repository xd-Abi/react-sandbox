import {useSelector} from "react-redux";
import {GlobalStoreType} from "../store";

export const useSignUpSelector = () => {
  return useSelector((state: GlobalStoreType) => state.signUp);
};
