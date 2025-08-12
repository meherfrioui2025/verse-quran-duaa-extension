import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  size?: string;
  active?: boolean;
}

const Button: FC<PropsWithChildren<IconButtonProps>> = ({
  icon,
  size = "text-lg",
  active = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <button type="button" className={`cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
