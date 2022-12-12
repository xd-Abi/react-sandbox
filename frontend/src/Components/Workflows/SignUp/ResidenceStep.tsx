import {useEffect, useState} from "react";
import {SelectItemOptionsType} from "primereact/selectitem";
import {Button} from "primereact/button";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputText} from "primereact/inputtext";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import * as CountryList from "country-list";

import ResidenceStepType from "./Types/ResidenceStepType";
import {Dropdown} from "primereact/dropdown";

type ResidenceStepProps = {
  onSubmit: (data: ResidenceStepType) => void;
};

const ResidenceStep = (props: ResidenceStepProps) => {
  const [contryOptions, setCountryOptions] = useState<SelectItemOptionsType>();

  const yupValidationSchema = yup.object<
    Record<keyof ResidenceStepType, yup.AnySchema>
  >({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postcode: yup.string().required("Postcode is required"),
    country: yup.string().required("Country is required"),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: {errors},
  } = useForm<ResidenceStepType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    let options = [] as SelectItemOptionsType;
    for (let country of CountryList.getData()) {
      options.push({label: country.name, value: country.code});
    }

    setCountryOptions(options);
  }, []);

  return (
    <form className="grid" onSubmit={handleSubmit(props.onSubmit)}>
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
                options={contryOptions}
                filter
                {...field}
              />
            )}
          />
        </div>
        {<p className="p-error block">{errors.country?.message}</p>}
      </div>
      <div className="col-12 pt-3">
        <div className="flex justify-content-center">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default ResidenceStep;
