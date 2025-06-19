

import * as React from "react";
import { Popover, Paper, styled } from "@mui/material";

interface HoverCardContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (element: HTMLElement | null) => void;
}

const HoverCardContext = React.createContext<HoverCardContextType | null>(null);

const useHoverCard = () => {
  const context = React.useContext(HoverCardContext);
  if (!context) {
    throw new Error("useHoverCard must be used within a HoverCard component");
  }
  return context;
};

interface HoverCardRootProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

const HoverCard: React.FC<HoverCardRootProps> = ({ 
  children, 
  openDelay = 700, 
  closeDelay = 300 
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const openTimeoutRef = React.useRef<NodeJS.Timeout>();
  const closeTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleOpenChange = (newOpen: boolean) => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (newOpen) {
      openTimeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, openDelay);
    } else {
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, closeDelay);
    }
  };

  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <HoverCardContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        anchorEl,
        setAnchorEl,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
};

interface HoverCardTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const HoverCardTrigger = React.forwardRef<HTMLElement, HoverCardTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const { onOpenChange, setAnchorEl } = useHoverCard();

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      onOpenChange(true);
    };

    const handleMouseLeave = () => {
      onOpenChange(false);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      });
    }

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HoverCardTrigger.displayName = "HoverCardTrigger";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 256, // w-64 equivalent
  padding: theme.spacing(2),
  zIndex: 50,
  boxShadow: theme.shadows[8],
  outline: 'none',
}));

interface HoverCardContentProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ children, align = "center", sideOffset = 4, side = "bottom", className, ...props }, ref) => {
    const { open, onOpenChange, anchorEl } = useHoverCard();

    const handleMouseEnter = () => {
      onOpenChange(true);
    };

    const handleMouseLeave = () => {
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
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={getAnchorOrigin()}
        transformOrigin={getTransformOrigin()}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        slotProps={{
          paper: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            sx: {
              marginTop: side === "bottom" ? `${sideOffset}px` : undefined,
              marginBottom: side === "top" ? `${sideOffset}px` : undefined,
              marginLeft: side === "right" ? `${sideOffset}px` : undefined,
              marginRight: side === "left" ? `${sideOffset}px` : undefined,
              pointerEvents: 'auto',
            }
          }
        }}
      >
        <StyledPaper ref={ref} className={className} {...props}>
          {children}
        </StyledPaper>
      </Popover>
    );
  }
);

HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
