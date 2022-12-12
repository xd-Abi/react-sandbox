import {useEffect, useState} from "react";
import {SelectItemOptionsType} from "primereact/selectitem";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as CountryList from "country-list";

import {useSignUpDispatch, useSignUpSelector} from "../../../hooks";
import {residenceChange, ResidenceChangeType} from "../../../store/user";
import {SignUpWorkflowStepProps} from "../types";

const ResidenceStep = (props: SignUpWorkflowStepProps) => {
  const yupValidationSchema = yup.object<
    Record<keyof ResidenceChangeType, yup.AnySchema>
  >({
    address: yup.string().required("Address is required"),
    // @TODO: City validation
    city: yup.string().required("City is required"),
    // @TODO: Postcode validation
    postcode: yup.string().required("Postcode is required"),
    country: yup.string().required("Country is required"),
  });

  const dispatch = useSignUpDispatch();
  const initialState = useSignUpSelector();
  const [countryOptions, setCountryOptions] = useState<SelectItemOptionsType>();

  const {
    handleSubmit,
    register,
    control,
    formState: {errors},
    getValues,
  } = useForm<ResidenceChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
    defaultValues: {
      ...initialState,
    },
  });

  useEffect(() => {
    let options = [] as SelectItemOptionsType;
    for (let country of CountryList.getData()) {
      options.push({label: country.name, value: country.name});
    }

    setCountryOptions(options);
  }, []);

  const onBackButtonClick = () => {
    dispatch(
      residenceChange({
        address: getValues("address"),
        city: getValues("city"),
        postcode: getValues("postcode"),
        country: getValues("country"),
      })
    );
    props.onBackButtonClick!();
  };

  const onSubmit = (data: ResidenceChangeType) => {
    dispatch(residenceChange(data));
    props.onNextButtonClick!();
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-0 m-0">
          <p>Address</p>
          <div className="p-inputgroup">
            <InputText
              className={`p-inputtext-lg ${
                errors.address?.message ? "p-invalid" : ""
              }`}
              {...register("address")}
            />
          </div>
          {<p className="p-error block">{errors.address?.message}</p>}
        </div>
        <div className="col-12 p-0 m-0">
          <p>City</p>
          <div className="p-inputgroup">
            <InputText
              className={`p-inputtext-lg ${
                errors.city?.message ? "p-invalid" : ""
              }`}
              {...register("city")}
            />
          </div>
          {<p className="p-error block">{errors.city?.message}</p>}
        </div>
        <div className="col-12 p-0 m-0">
          <p>Postcode</p>
          <div className="p-inputgroup">
            <InputText
              className={`p-inputtext-lg ${
                errors.postcode?.message ? "p-invalid" : ""
              }`}
              {...register("postcode")}
            />
          </div>
          {<p className="p-error block">{errors.postcode?.message}</p>}
        </div>
        <div className="col-12 p-0 m-0">
          <p>Country</p>
          <div className="p-inputgroup">
            <Controller
              name="country"
              control={control}
              render={({field}: any) => (
                <Dropdown
                  className={`p-inputtext-lg ${
                    errors.country?.message ? "p-invalid" : ""
                  }`}
                  options={countryOptions}
                  filter
                  onChange={e => field.onChange(e.value)}
                  value={field.value}
                />
              )}
            />
          </div>
          {<p className="p-error block">{errors.country?.message}</p>}
        </div>
        <div className="col-12 pt-3">
          <div className="flex justify-content-center">
            <Button
              label="Back"
              onClick={onBackButtonClick}
              className="mr-3 p-button-secondary"
            />
            <Button label="Continue" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResidenceStep;
