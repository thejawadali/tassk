import * as React from "react";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  touched?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const baseClass = `flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className} ${
      props.error && props.touched
        ? "border-red-500"
        : "border-input focus-visible:ring-1 focus-visible:ring-ring"
    }`;
    return (
      <div>
        {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
        <textarea className={baseClass} ref={ref} {...props} />
        {props.touched && props.error ? (
        <span className="text-red-500 text-sm">{props.error}</span>
      ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
