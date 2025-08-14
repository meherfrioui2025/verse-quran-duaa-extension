import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

const Button: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ className = "", children, ...props }) => {
  return (
    <button type="button" className={`cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
