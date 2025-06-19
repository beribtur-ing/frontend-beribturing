import * as React from "react";
import { 
  AppBar, 
  Toolbar, 
  Menu, 
  MenuItem, 
  Button, 
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  styled
} from "@mui/material";
import { Check, ChevronRight, Circle } from "lucide-react";

// Simplified menubar implementation
const StyledMenubar = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 40,
  alignItems: 'center',
  gap: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0.5),
}));

const StyledMenubarTrigger = styled(Button)(({ theme }) => ({
  display: 'flex',
  cursor: 'default',
  userSelect: 'none',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75, 1.5),
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  outline: 'none',
  minWidth: 'auto',
  '&:focus': {
    backgroundColor: theme.palette.action.selected,
  },
  '&[data-state="open"]': {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface MenubarProps {
  children: React.ReactNode;
  className?: string;
}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => (
    <StyledMenubar ref={ref} className={className} {...props}>
      {children}
    </StyledMenubar>
  )
);

Menubar.displayName = "Menubar";

const MenubarMenu = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const MenubarTrigger = React.forwardRef<HTMLButtonElement, any>(
  ({ className, children, ...props }, ref) => (
    <StyledMenubarTrigger
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </StyledMenubarTrigger>
  )
);

MenubarTrigger.displayName = "MenubarTrigger";

// Simplified components using MUI equivalents
const MenubarContent = Menu;
const MenubarItem = MenuItem;
const MenubarCheckboxItem = MenuItem;
const MenubarRadioItem = MenuItem;
const MenubarLabel = Typography;
const MenubarSeparator = Divider;
const MenubarGroup = MenuList;
const MenubarPortal = React.Fragment;
const MenubarSub = React.Fragment;
const MenubarSubContent = Menu;
const MenubarSubTrigger = MenuItem;
const MenubarRadioGroup = MenuList;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <Typography
      component="span"
      variant="caption"
      className={className}
      sx={{
        marginLeft: 'auto',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        color: 'text.secondary',
      }}
      {...props}
    />
  );
};

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};