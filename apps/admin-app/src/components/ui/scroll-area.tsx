

import * as React from "react";
import { Box, BoxProps, styled } from "@mui/material";

const StyledScrollArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'auto',
  height: '100%',
  width: '100%',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '9999px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '9999px',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
}));

interface ScrollAreaProps extends BoxProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <StyledScrollArea
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </StyledScrollArea>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

// ScrollBar component for backward compatibility
interface ScrollBarProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ orientation = "vertical", className, ...props }, ref) => {
    // This component is now mostly for API compatibility
    // The actual scrollbar styling is handled by the ScrollArea component
    return null;
  }
);

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
