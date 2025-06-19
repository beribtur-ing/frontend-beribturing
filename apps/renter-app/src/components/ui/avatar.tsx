
import * as React from "react"
import { Avatar as MUIAvatar, AvatarProps as MUIAvatarProps } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledAvatar = styled(MUIAvatar)<{ className?: string }>(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '14px',
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
}))

export interface AvatarProps extends Omit<MUIAvatarProps, 'children'> {
  children?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => {
    // If children contains AvatarImage or AvatarFallback, handle them specially
    const processedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === AvatarImage) {
          return React.cloneElement(child as React.ReactElement<AvatarImageProps>)
        }
        if (child.type === AvatarFallback) {
          return child.props.children
        }
      }
      return child
    })

    // Extract src from AvatarImage if present
    let src: string | undefined
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === AvatarImage) {
        src = (child as React.ReactElement<AvatarImageProps>).props.src
      }
    })

    return (
      <StyledAvatar
        ref={ref}
        className={className}
        src={src}
        {...props}
      >
        {processedChildren}
      </StyledAvatar>
    )
  }
)
Avatar.displayName = "Avatar"

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt, ...props }, ref) => {
    // This component is processed by Avatar component above
    return null
  }
)
AvatarImage.displayName = "AvatarImage"

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    // This component is processed by Avatar component above
    return null
  }
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
