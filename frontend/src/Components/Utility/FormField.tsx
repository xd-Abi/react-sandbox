import {InputText} from "primereact/inputtext";
import {Control, Controller} from "react-hook-form";

interface IFormFieldProps {
  id: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField = (props: IFormFieldProps) => {
  const errorClassNames = () => {
    return props.error ? "p-invalid" : "";
  };

  return (
    <Controller
      render={({field}: any) => (
        <div className="p-inputgroup">
          <InputText
            id={props.id}
            disabled={props.disabled}
            className={`p-inputtext-lg ${errorClassNames()}`}
            {...field}
          />
          <label htmlFor={props.id}>{props.label}</label>
          {props.error !== "" && (
            <p id={props.id} className="p-error block">
              {props.error}
            </p>
          )}
        </div>
      )}
      control={props.control}
      name={props.id}
    />
  );
};

export default FormField;
