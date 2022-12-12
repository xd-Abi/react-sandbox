import {Control, Controller} from "react-hook-form";
import {SelectItemOptionsType} from "primereact/selectitem";
import {Dropdown} from "primereact/dropdown";

export type IDropdownOptions = SelectItemOptionsType;

interface IFormDropdownProps {
  id: string;
  label: string;
  control: Control<any>;
  options: IDropdownOptions;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormDropdown = (props: IFormDropdownProps) => {
  const errorClassNames = () => {
    return props.error ? "p-invalid" : "";
  };

  return (
    <Controller
      render={({field}: any) => (
        <div className="p-float-label">
          <Dropdown
            id={props.id}
            disabled={props.disabled}
            className={`p-inputgroup ${errorClassNames()}`}
            options={props.options}
            {...field}
          />
          {props.error !== "" && (
            <p id={props.id} className="p-error block">
              {props.error}
            </p>
          )}
          <label htmlFor={props.id}>{props.label}</label>
        </div>
      )}
      control={props.control}
      name={props.id}
    />
  );
};

export default FormDropdown;
