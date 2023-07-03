import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Separator } from "../ui/separator";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: ReactElement;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  label: string;
}

export default function Input({
  Icon,
  placeholder,
  type,
  id,
  setValue,
  value,
  label,
}: Props): ReactElement {
  return (
    <div className="space-y-2 group">
      <label
        htmlFor={id}
        className="block text-sm text-black/70 dark:text-white/70 font-mono font-bold"
      >
        {label}
      </label>
      <div className="flex">
        <label htmlFor={id}>{Icon}</label>
        <input
          type={type}
          id={id}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          className="border-none outline-none dark:bg-background focus:border-none focus:outline-none w-full px-3 max-h-8 placeholder:text-primary dark:placeholder:text-white group-focus-within:placeholder:text-sm transition-all duration-150"
        />
      </div>
      <Separator className="group-focus-within:bg-black bg-primary dark:group-focus-within:bg-white"></Separator>
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
  setValue,
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
      <div className="flex relative">
        <label htmlFor={id}>{Icon}</label>
        <input
          ref={ref}
          type={isShown ? "text" : type}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          value={value}
          placeholder={placeholder}
          className="border-none outline-none dark:bg-background focus:border-none focus:outline-none w-full px-3 placeholder:text-primary dark:placeholder:text-white group-focus-within:placeholder:text-sm transition-all duration-150"
        />
        <label htmlFor={id} className="absolute right-0 h-full w-8">
          {ref.current && value !== "" && (
            <>
              {!isShown && <EyeIcon onClick={showPassword}></EyeIcon>}

              {isShown && <EyeOffIcon onClick={hidePassword}></EyeOffIcon>}
            </>
          )}
        </label>
      </div>
      <Separator className="group-focus-within:bg-black bg-primary dark:group-focus-within:bg-white"></Separator>
    </div>
  );
  function showPassword() {
    setIsShown(true);
  }
  function hidePassword() {
    setIsShown(false);
  }
}
