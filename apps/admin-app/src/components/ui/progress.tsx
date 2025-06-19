

import * as React from "react";
import { LinearProgress, LinearProgressProps, styled } from "@mui/material";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 9999,
  backgroundColor: theme.palette.action.hover,
  '& .MuiLinearProgress-bar': {
    borderRadius: 9999,
    backgroundColor: theme.palette.primary.main,
  },
}));

interface ProgressProps extends Omit<LinearProgressProps, 'value'> {
  value?: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <StyledLinearProgress
        ref={ref}
        variant="determinate"
        value={value}
        className={className}
        {...props}
      />
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
