

import * as React from "react";
import { 
  Autocomplete, 
  TextField, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  InputAdornment, 
  Divider,
  Box,
  styled,
  DialogProps
} from "@mui/material";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const StyledList = styled(List)(({ theme }) => ({
  maxHeight: 300,
  overflow: 'auto',
  padding: theme.spacing(0.5),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  cursor: 'default',
  userSelect: 'none',
  padding: theme.spacing(0.75, 1),
  margin: theme.spacing(0.25, 0),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

interface CommandProps {
  children: React.ReactNode;
  className?: string;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, children, ...props }, ref) => (
    <StyledPaper ref={ref} className={className} {...props}>
      {children}
    </StyledPaper>
  )
);

Command.displayName = "Command";

interface CommandDialogProps extends DialogProps {
  children: React.ReactNode;
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent sx={{ overflow: 'hidden', p: 0 }}>
        <Command>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, placeholder, value, onValueChange, ...props }, ref) => (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 1.5 }}>
      <TextField
        ref={ref}
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={className}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} style={{ opacity: 0.5 }} />
            </InputAdornment>
          ),
          sx: { py: 1.5 },
        }}
        {...props}
      />
    </Box>
  )
);

CommandInput.displayName = "CommandInput";

interface CommandListProps {
  children: React.ReactNode;
  className?: string;
}

const CommandList = React.forwardRef<HTMLUListElement, CommandListProps>(
  ({ className, children, ...props }, ref) => (
    <StyledList ref={ref} className={className} {...props}>
      {children}
    </StyledList>
  )
);

CommandList.displayName = "CommandList";

interface CommandEmptyProps {
  children: React.ReactNode;
  className?: string;
}

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className, ...props }, ref) => (
    <Box
      ref={ref}
      className={className}
      sx={{ py: 3, textAlign: 'center', fontSize: '0.875rem' }}
      {...props}
    >
      {children}
    </Box>
  )
);

CommandEmpty.displayName = "CommandEmpty";

interface CommandGroupProps {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <Box ref={ref} className={className} sx={{ overflow: 'hidden', p: 0.5 }} {...props}>
      {heading && (
        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.75,
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          {heading}
        </Typography>
      )}
      {children}
    </Box>
  )
);

CommandGroup.displayName = "CommandGroup";

interface CommandSeparatorProps {
  className?: string;
}

const CommandSeparator = React.forwardRef<HTMLHRElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <Divider
      ref={ref}
      className={className}
      sx={{ mx: -0.5, my: 0.5 }}
      {...props}
    />
  )
);

CommandSeparator.displayName = "CommandSeparator";

interface CommandItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

const CommandItem = React.forwardRef<HTMLLIElement, CommandItemProps>(
  ({ className, children, onSelect, disabled, ...props }, ref) => (
    <StyledListItem
      ref={ref}
      className={className}
      onClick={onSelect}
      disabled={disabled}
      {...props}
    >
      <ListItemText primary={children} />
    </StyledListItem>
  )
);

CommandItem.displayName = "CommandItem";

interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const CommandShortcut = ({ className, children, ...props }: CommandShortcutProps) => {
  return (
    <Typography
      component="span"
      variant="caption"
      className={className}
      sx={{
        ml: 'auto',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        color: 'text.secondary',
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
