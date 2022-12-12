import {Calendar} from "primereact/calendar";
import {Control, Controller} from "react-hook-form";

interface IFormCalendarProps {
  id: string;
  label: string;
  control: Control<any>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormCalendar = (props: IFormCalendarProps) => {
  const errorClassNames = () => {
    return props.error ? "p-invalid" : "";
  };

  return (
    <Controller
      render={({field: {onChange, value}}: any) => (
        <div>
          <div className="p-float-label">
            <Calendar
              id={props.id}
              disabled={props.disabled}
              className={`p-inputgroup ${errorClassNames()}`}
              value={value ? new Date(value) : null}
              onChange={onChange}
            />
            <label htmlFor={props.id}>{props.label}</label>
          </div>
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

export default FormCalendar;
