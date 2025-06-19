

import * as React from "react"
import { Avatar as MUIAvatar, AvatarProps as MUIAvatarProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledAvatar = styled(MUIAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '14px',
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
}))

export interface AvatarProps extends MUIAvatarProps {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => (
    <StyledAvatar
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </StyledAvatar>
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        aspectRatio: '1/1'
      }}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5'
      }}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
