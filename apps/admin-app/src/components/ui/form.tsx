

import * as React from "react";
import { 
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
  FormHelperText,
  Typography,
  Box,
  styled
} from "@mui/material";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const StyledFormItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <StyledFormItem ref={ref} className={className} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof MuiFormLabel> {
  className?: string;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        className={className}
        htmlFor={formItemId}
        style={{ color: error ? 'error.main' : undefined }}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

interface FormControlProps {
  children: React.ReactElement;
  className?: string;
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, className, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        id: formItemId,
        'aria-describedby': !error
          ? formDescriptionId
          : `${formDescriptionId} ${formMessageId}`,
        'aria-invalid': !!error,
        className,
        ...props,
      });
    }

    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error
            ? formDescriptionId
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <Typography
      ref={ref}
      id={formDescriptionId}
      variant="body2"
      color="text.secondary"
      className={className}
      {...props}
    />
  );
});

FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Typography
      ref={ref}
      id={formMessageId}
      variant="body2"
      color="error"
      fontWeight="medium"
      className={className}
      {...props}
    >
      {body}
    </Typography>
  );
});

FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
