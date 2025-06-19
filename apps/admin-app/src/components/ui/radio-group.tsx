

import * as React from "react";
import { 
  RadioGroup as MuiRadioGroup, 
  Radio as MuiRadio, 
  FormControlLabel,
  RadioGroupProps as MuiRadioGroupProps,
  RadioProps as MuiRadioProps,
  styled
} from "@mui/material";

const StyledRadioGroup = styled(MuiRadioGroup)(({ theme }) => ({
  gap: theme.spacing(1),
}));

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  width: 16,
  height: 16,
  padding: 0,
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, defaultValue, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onValueChange?.(newValue);
      onChange?.(event, newValue);
    };

    return (
      <StyledRadioGroup
        ref={ref}
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends Omit<MuiRadioProps, 'value'> {
  value: string;
  className?: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <StyledRadio
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
