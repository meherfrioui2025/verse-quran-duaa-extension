import { FC } from "react";

interface SelectOption<T = string | number> {
  value: T;
  label: string;
}

interface SelectProps<T = string | number> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
}

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          typeof value === "number"
            ? (Number(e.target.value) as any)
            : (e.target.value as any)
        )
      }
      className={`border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white cursor-pointer ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
