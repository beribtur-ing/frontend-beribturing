import * as React from "react";
import { Breadcrumbs, Link, Typography, Box, styled } from "@mui/material";
import { ChevronRight, MoreHorizontal } from "lucide-react";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.text.secondary,
  '& .MuiBreadcrumbs-separator': {
    margin: theme.spacing(0, 0.75),
  },
}));

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator, children, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" {...props}>
      {children}
    </nav>
  )
);
Breadcrumb.displayName = "Breadcrumb";

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  separator?: React.ReactNode;
}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, separator, children, ...props }, ref) => (
    <StyledBreadcrumbs
      separator={separator || <ChevronRight size={14} />}
      className={className}
      {...props}
    >
      {children}
    </StyledBreadcrumbs>
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => (
    <Box component="span" className={className} {...props}>
      {children}
    </Box>
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        className,
      });
    }

    return (
      <Link
        ref={ref}
        className={className}
        underline="hover"
        color="inherit"
        {...props}
      >
        {children}
      </Link>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    component="span"
    variant="body2"
    color="text.primary"
    className={className}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <Box
    component="span"
    role="presentation"
    aria-hidden="true"
    className={className}
    sx={{ display: 'inline-flex', alignItems: 'center' }}
    {...props}
  >
    {children ?? <ChevronRight size={14} />}
  </Box>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <Box
    component="span"
    role="presentation"
    aria-hidden="true"
    className={className}
    sx={{ 
      display: 'flex', 
      height: 36, 
      width: 36, 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}
    {...props}
  >
    <MoreHorizontal size={16} />
    <Typography component="span" sx={{ position: 'absolute', left: -10000 }}>
      More
    </Typography>
  </Box>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
