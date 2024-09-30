import * as React from "react";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const baseClass = `flex h-9 w-full rounded-md border bg-transparent px-3 focus-visible:outline-none py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
      className
    } ${
      props.error && props.touched ? "border-red-500" : "border-input focus-visible:ring-1 focus-visible:ring-ring"
    }`;
    return (
      <div>
        {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
        <input
          type={type}
          className={baseClass}
          ref={ref}
          {...props}
        />
        {props.touched && props.error ? (
        <span className="text-red-500 text-sm">{props.error}</span>
      ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
