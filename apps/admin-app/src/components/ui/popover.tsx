

import * as React from "react";
import { Popover as MuiPopover, PopoverProps, Paper, styled } from "@mui/material";

interface PopoverContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (element: HTMLElement | null) => void;
}

const PopoverContext = React.createContext<PopoverContextType | null>(null);

const usePopover = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover component");
  }
  return context;
};

interface PopoverRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Popover: React.FC<PopoverRootProps> = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider
      value={{
        open: isOpen,
        onOpenChange: handleOpenChange,
        anchorEl,
        setAnchorEl,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const { onOpenChange, setAnchorEl } = usePopover();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      onOpenChange(true);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: handleClick,
      });
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 288, // w-72 equivalent
  padding: theme.spacing(2),
  zIndex: 50,
  boxShadow: theme.shadows[8],
  outline: 'none',
}));

interface PopoverContentProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, align = "center", sideOffset = 4, side = "bottom", className, ...props }, ref) => {
    const { open, onOpenChange, anchorEl } = usePopover();

    const handleClose = () => {
      onOpenChange(false);
    };

    const getAnchorOrigin = () => {
      const alignMap = {
        start: "start",
        center: "center", 
        end: "end"
      } as const;

      const sideMap = {
        top: { vertical: "top", horizontal: alignMap[align] },
        bottom: { vertical: "bottom", horizontal: alignMap[align] },
        left: { vertical: alignMap[align], horizontal: "left" },
        right: { vertical: alignMap[align], horizontal: "right" }
      } as const;

      return sideMap[side] as { vertical: "top" | "bottom" | "start" | "end" | "center"; horizontal: "left" | "right" | "start" | "end" | "center" };
    };

    const getTransformOrigin = () => {
      const oppositeMap = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left"
      } as const;

      const alignMap = {
        start: "start",
        center: "center",
        end: "end"
      } as const;

      const oppositeSide = oppositeMap[side];
      
      if (side === "top" || side === "bottom") {
        return { vertical: oppositeSide, horizontal: alignMap[align] };
      } else {
        return { vertical: alignMap[align], horizontal: oppositeSide };
      }
    };

    return (
      <MuiPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getAnchorOrigin()}
        transformOrigin={getTransformOrigin()}
        slotProps={{
          paper: {
            sx: {
              marginTop: side === "bottom" ? `${sideOffset}px` : undefined,
              marginBottom: side === "top" ? `${sideOffset}px` : undefined,
              marginLeft: side === "right" ? `${sideOffset}px` : undefined,
              marginRight: side === "left" ? `${sideOffset}px` : undefined,
            }
          }
        }}
      >
        <StyledPaper ref={ref} className={className} {...props}>
          {children}
        </StyledPaper>
      </MuiPopover>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
