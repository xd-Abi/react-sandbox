import {useDispatch} from "react-redux";
import {GlobalStoreDispatchType} from "../store";

export const useSignUpDispatch = () => {
  return useDispatch<GlobalStoreDispatchType>();
};
