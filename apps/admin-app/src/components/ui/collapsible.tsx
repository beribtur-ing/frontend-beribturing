

import * as React from "react";
import { Collapse, Box, styled } from "@mui/material";

interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextType | null>(null);

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a Collapsible component");
  }
  return context;
};

interface CollapsibleProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ 
  children, 
  open, 
  onOpenChange, 
  defaultOpen = false 
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <CollapsibleContext.Provider
      value={{
        open: isOpen,
        onOpenChange: handleOpenChange,
      }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
};

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const { open, onOpenChange } = useCollapsible();

    const handleClick = () => {
      onOpenChange(!open);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        className,
        onClick: handleClick,
      });
    }

    return (
      <button ref={ref} className={className} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = useCollapsible();

    return (
      <Collapse in={open}>
        <Box ref={ref} className={className} {...props}>
          {children}
        </Box>
      </Collapse>
    );
  }
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
