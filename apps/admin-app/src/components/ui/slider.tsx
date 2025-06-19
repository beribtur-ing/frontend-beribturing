

import * as React from "react";
import { Slider as MuiSlider, SliderProps as MuiSliderProps, styled } from "@mui/material";

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
  width: "100%",
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    height: 8,
    borderRadius: 9999,
  },
  '& .MuiSlider-rail': {
    height: 8,
    borderRadius: 9999,
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.main}14`,
    },
    '&:before': {
      display: 'none',
    },
  },
}));

interface SliderProps extends Omit<MuiSliderProps, 'value' | 'defaultValue'> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  ({ value, defaultValue, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
      const arrayValue = Array.isArray(newValue) ? newValue : [newValue];
      onValueChange?.(arrayValue);
      onChange?.(event, newValue);
    };

    return (
      <StyledSlider
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
