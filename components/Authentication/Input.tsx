import { cn } from "@/lib/utils";
import clsx from "clsx";
import { AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: ReactElement;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  label: string;
  error?: boolean;
}

export default function Input({
  Icon,
  placeholder,
  type,
  id,
  setValue,
  value,
  label,
  className,
  error = false,
  ...props
}: Props): ReactElement {
  return (
    <div className="space-y-2 group">
      <label
        htmlFor={id}
        className="block text-sm text-black/70 dark:text-white/70 font-mono font-bold"
      >
        {label}
      </label>
      <div className="flex relative gap-2 items-center ">
        <label htmlFor={id} className={error ? "text-red-500" : "text-primary"}>
          {Icon}
        </label>
        <input
          type={type}
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          {...props}
          style={{
            background: "black",
          }}
          className={cn(
            "border-none rounded-md outline-none dark:bg-background focus:border-none focus:outline-none w-full px-3 max-h-8  group-focus-within:placeholder:text-sm transition-all duration-150",
            error
              ? "placeholder:text-red-500"
              : "placeholder:text-primary dark:placeholder:text-white",
            className
          )}
        />
        {error && (
          <label htmlFor={id} className="absolute right-0 h-full w-8">
            <AlertTriangle color="red" />
          </label>
        )}
      </div>

      <Separator
        className={clsx(
          "group-focus-within:bg-black dark:group-focus-within:bg-white",
          { "bg-red-500": error, "bg-primary": !error }
        )}
      ></Separator>
    </div>
  );
}

export function PasswordInput({
  Icon,
  type,
  id,
  value,
  placeholder,
  label,
  error,
  className,
  setValue,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    if (value === "" || !value) setIsShown(false);
  }, [value]);
  return (
    <div className="space-y-2 group">
      <label
        htmlFor={id}
        className="block text-sm text-black/70 dark:text-white/70 font-mono font-bold"
      >
        {label}
      </label>
      <div className="flex relative gap-2 items-center">
        <label htmlFor={id} className={error ? "text-red-500" : "text-primary"}>
          {Icon}
        </label>
        <input
          ref={ref}
          type={isShown ? "text" : type}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          value={value}
          placeholder={placeholder}
          className={cn(
            "border-none  rounded-md  outline-none dark:bg-background focus:border-none focus:outline-none w-full px-3   group-focus-within:placeholder:text-sm transition-all duration-150",
            error
              ? "placeholder:text-red-500"
              : "placeholder:text-primary dark:placeholder:text-white",
            className
          )}
          {...props}
        />

        {error && (
          <label htmlFor={id} className="absolute right-0 h-full w-8">
            <AlertTriangle color="red" />
          </label>
        )}

        <label htmlFor={id} className="absolute right-0 h-full w-8">
          {ref.current && value !== "" && !error && (
            <>
              {!isShown && <EyeIcon onClick={showPassword}></EyeIcon>}

              {isShown && <EyeOffIcon onClick={hidePassword}></EyeOffIcon>}
            </>
          )}
        </label>
      </div>
      <Separator
        className={clsx(
          "group-focus-within:bg-black dark:group-focus-within:bg-white",
          { "bg-red-500": error, "bg-primary": !error }
        )}
      ></Separator>
    </div>
  );
  function showPassword() {
    setIsShown(true);
  }
  function hidePassword() {
    setIsShown(false);
  }
}
