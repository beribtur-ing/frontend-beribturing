
import React from "react";
import { Box, BoxProps } from "@mui/material";

interface AspectRatioProps extends Omit<BoxProps, 'children'> {
  ratio?: number;
  children: React.ReactNode;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio.toString(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
