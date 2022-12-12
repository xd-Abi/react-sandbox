import {yupResolver} from "@hookform/resolvers/yup";
import {InputText} from "primereact/inputtext";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {Password} from "primereact/password";

import {Button} from "primereact/button";
import ResidenceStepType from "./Types/ResidenceStepType";

type ResidenceStepProps = {
  onSubmit: (data: ResidenceStepType) => void;
};

const ResidenceStep = (props: ResidenceStepProps) => {
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
      <div className="col-12">
        <div className="flex justify-content-center">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default ResidenceStep;
