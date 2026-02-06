'use client';
import React, { InputHTMLAttributes, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Field, FieldContent, FieldError, FieldLabel } from './ui/field';

export type Type =
  | 'text'
  | 'hidden'
  | 'password'
  | 'file'
  | 'date'
  | 'pin'
  | 'time'
  | 'number'
  | 'uploadFile'
  | 'select';

export default function FormInput({
  type,
  label,
  name,
  control,
  className,
  children,
  labelState = true,
  ...props
}: {
  type: Type;
  name: string;
  control: unknown;
  className?: string;
  label?: string;
  labelState?: boolean;
  children?: React.ReactNode[]
} & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState<'password' | 'text'>('password');
  const ref = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false)
  function showHandle() {
    if (show === 'password') {
      setShow('text');
    } else {
      setShow('password');
    }
  }

  // const { control: newControl } = useFormContext<any>();


  switch (type) {
    case 'text':
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
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={!labelState ? (label ? label : name) : props.placeholder}
                {...field}
                {...props}
                className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case "hidden":
      return (
        <FormField
          control={control as Control<FieldValues> | undefined}
          name={name}
          render={({ field }) => (
            <FormItem>
              {/* {labelState && (
                <FormLabel className="w-full text-left font-semibold capitalize text-base">
                  {label ? label : name}
                </FormLabel>
              )} */}
              <FormControl>
                <Input
                  type={type}
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  {...field}
                  {...props}
                  className={`block w-full border-2  !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      break;
    case 'password':
      return (
        <FormField
          control={control as Control<FieldValues>}
          name={name}
          render={({ field }) => (
            <FormItem>
              {labelState && (
                <FormLabel className="w-full text-left capitalize text-sm mt-3 -mb-2">
                  {label ? label : name}
                </FormLabel>
              )}
              <FormControl>
                <div className="mt-1 relative parent">
                  <Input
                    placeholder={!labelState ? (label ? label : name) : props.placeholder}
                    {...field}
                    {...props}
                    type={show}
                    autoComplete="off"
                    ref={ref}
                    className={`block w-full border-2  !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
                  />
                  <span
                    className="absolute right-[14px] top-1/2 -translate-y-1/2  hover:opacity-100 pass-show transition-all duration-200 cursor-pointer sibling-element"
                    onClick={showHandle}
                  >
                    {show === 'text' ? <EyeOff className='w-5' /> : <Eye className='w-5' />}
                  </span>
                </div>
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      );
      break;
    case 'number':
      return (
        <Controller
          name={name}
          // control={newControl}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={!labelState ? (label ? label : name) : props.placeholder}
                {...props}
                className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'file':
      return (
        <>
          <Controller
            name={name}
            // control={newControl}
            control={control as Control<FieldValues> | undefined}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {labelState && (
                  <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                    {label ? label : name}
                  </FieldLabel>
                )}
                <Input
                  type='file'
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  // {...field}
                  {...props}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file); // <-- send file object to React Hook Form
                  }}
                  className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </>
      );
      break;
    case 'select':
      return (
        <Controller
          name={name}
          // control={newControl}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                {labelState && (
                  <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                    {label ? label : name}
                  </FieldLabel>
                )}
                {/* <FieldDescription>
                  For best results, select the language you speak.
                </FieldDescription> */}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select
                disabled={props.disabled}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="w-full py-2 font-medium"
                >
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent >
                  {children}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        // <FormField
        //   control={control as Control<FieldValues>}
        //   name={name}
        //   render={({ field: { onChange, value } }) => (
        //     <FormItem>
        //       <input type="hidden" value={value} name={name} />
        //       {labelState && (
        //         <FormLabel className="w-full text-left capitalize text-sm mt-3 -mb-1">
        //           {label ? label : name}
        //         </FormLabel>
        //       )}
        //       <Select onValueChange={onChange} value={value} disabled={props.disabled} >
        //         <FormControl >
        //           <SelectTrigger className="w-full py-2 font-medium">
        //             <SelectValue />
        //           </SelectTrigger>
        //         </FormControl >
        //         <SelectContent >
        //           {children}
        //         </SelectContent>
        //       </Select>
        //       {/* <FormDescription>This is your public display name.</FormDescription> */}
        //       <FormMessage />
        //     </FormItem>
        //   )}
        // />
      );
      break;
    case 'date':
      return (
        <FormField
          control={control as Control<FieldValues>}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <input type="hidden" name="eventDate" value={field.value} />
              {labelState && (
                <FormLabel className="w-full text-left capitalize text-sm -mb-1">
                  {label ? label : name}
                </FormLabel>
              )}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="">
                  <FormControl className="py-4! mb-2! h-[42px] rounded-lg">
                    <Button
                      variant={'outline'}
                      className={`${cn('w-full pl-3  text-left font-normal', !field.value && 'text-muted-foreground')}  `}
                    >
                      {field.value ? field.value : <span>Bir tarih seçin</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    disabled={{ before: new Date() }}
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      const formattedDate = format(date as Date, 'dd/MM/yyyy');
                      field.onChange(formattedDate);
                      setOpen(false);
                    }}
                    // disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>Your date of birth is used to calculate your age.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case 'pin':
      return (
        <FormField
          control={control as Control<FieldValues>}
          name={name}
          render={({ field }) => (
            <FormItem>
              {labelState && (
                <FormLabel className="w-full text-left capitalize text-sm -mb-1">
                  {label ? label : name}
                </FormLabel>
              )}
              <FormControl className=''>
                <InputOTP maxLength={6} {...field} className="w-full">
                  <InputOTPGroup className="">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {/* <FormDescription>
                Emailinize gönderilen tek kullanımlık şifreyi giriniz lütfen.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case 'time':
      return (
        <FormField
          control={control as Control<FieldValues>}
          name={name}
          render={({ field }) => (
            <FormItem>
              {labelState && (
                <FormLabel className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FormLabel>
              )}
              <FormControl>
                <Input
                  type="time"
                  {...field}
                  onChangeCapture={(e) => {
                    field.onChange(e.currentTarget.value);
                    e.currentTarget.blur()
                  }}
                  className={`block w-full border-2  !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    default:
      break;
  }
  return <div>FormInput</div>;
}
