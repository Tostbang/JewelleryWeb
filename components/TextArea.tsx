import React, { TextareaHTMLAttributes } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { Field, FieldError, FieldLabel } from './ui/field';

export default function TextArea({
  label,
  name,
  control,
  className,
  labelState = true,
  ...props
}: {
  name: string;
  control: unknown;
  className?: string;
  label?: string;
  labelState?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues> | undefined}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {labelState && (
            <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
              {label ? label : name}
            </FieldLabel>
          )}
          <Textarea
            {...props}
            placeholder={!labelState ? (label ? label : name) : undefined}
            className={`resize-none ${className}`}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
          />
          {/* <FieldDescription>
            Tell us more about yourself. This will be used to help us
            personalize your experience.
          </FieldDescription> */}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />

    // <FormField
    //   control={control as Control<FieldValues> | undefined}
    //   name={name}
    //   render={({ field }) => (
    //     <FormItem>
    //       {labelState && (
    //         <FormLabel className="w-full text-left capitalize text-sm mt-3 -mb-1">
    //           {label ? label : name}
    //         </FormLabel>
    //       )}
    //       <FormControl>
    //         <Textarea
    //           {...props}
    //           placeholder={!labelState ? (label ? label : name) : undefined}
    //           className={`resize-none ${className}`}
    //           {...field}
    //         />
    //       </FormControl>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
}
