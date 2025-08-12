import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<PropsWithChildren<IconButtonProps>> = ({
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
