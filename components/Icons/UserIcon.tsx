import React, { ReactElement } from "react";

interface Props {}

export default function UserIcon({}: Props): ReactElement {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.88599 7.70726C8.94482 7.70726 9.86157 7.3275 10.6108 6.57823C11.3599 5.82909 11.7397 4.91247 11.7397 3.85351C11.7397 2.79492 11.36 1.87817 10.6107 1.12878C9.86145 0.37976 8.9447 0 7.88599 0C6.82703 0 5.9104 0.37976 5.16125 1.1289C4.41211 1.87805 4.03223 2.79479 4.03223 3.85351C4.03223 4.91247 4.41211 5.82921 5.16125 6.57836C5.91064 7.32738 6.82739 7.70726 7.88599 7.70726ZM5.82434 1.79187C6.39917 1.21704 7.07349 0.93762 7.88599 0.93762C8.69836 0.93762 9.3728 1.21704 9.94775 1.79187C10.5226 2.36682 10.8021 3.04125 10.8021 3.85351C10.8021 4.66601 10.5226 5.34032 9.94775 5.91527C9.3728 6.49022 8.69836 6.76964 7.88599 6.76964C7.07373 6.76964 6.39941 6.4901 5.82434 5.91527C5.24939 5.34044 4.96985 4.66601 4.96985 3.85351C4.96985 3.04125 5.24939 2.36682 5.82434 1.79187Z"
        fill="currentColor"
      />
      <path
        d="M14.629 12.3031C14.6074 11.9913 14.5637 11.6512 14.4994 11.2921C14.4344 10.9303 14.3508 10.5883 14.2507 10.2756C14.1472 9.95251 14.0067 9.63342 13.8328 9.32763C13.6525 9.01025 13.4406 8.73388 13.2028 8.50647C12.9541 8.26855 12.6497 8.07727 12.2976 7.93774C11.9468 7.79895 11.558 7.72864 11.1421 7.72864C10.9788 7.72864 10.8208 7.79565 10.5157 7.99426C10.328 8.1167 10.1084 8.2583 9.86328 8.41492C9.65369 8.54846 9.36975 8.67358 9.01904 8.78686C8.67688 8.89758 8.32947 8.95373 7.98645 8.95373C7.64368 8.95373 7.29626 8.89758 6.95386 8.78686C6.60352 8.6737 6.31946 8.54858 6.11023 8.41504C5.86743 8.25989 5.64771 8.11829 5.45715 7.99414C5.15234 7.79553 4.99438 7.72852 4.83105 7.72852C4.41504 7.72852 4.02637 7.79895 3.67566 7.93787C3.32385 8.07715 3.01929 8.26843 2.77039 8.50659C2.53259 8.73413 2.32068 9.01037 2.1405 9.32763C1.9668 9.63342 1.82617 9.95239 1.72266 10.2758C1.62268 10.5884 1.53906 10.9303 1.47412 11.2921C1.40967 11.6507 1.36609 11.991 1.34448 12.3035C1.32324 12.609 1.3125 12.927 1.3125 13.2483C1.3125 14.0835 1.578 14.7596 2.10156 15.2583C2.61865 15.7504 3.30273 15.9999 4.13489 15.9999H11.839C12.6709 15.9999 13.355 15.7504 13.8722 15.2583C14.3959 14.76 14.6614 14.0836 14.6614 13.2482C14.6613 12.9258 14.6504 12.6078 14.629 12.3031ZM13.2257 14.579C12.884 14.9042 12.4304 15.0622 11.8389 15.0622H4.13489C3.54321 15.0622 3.0896 14.9042 2.74805 14.5791C2.41296 14.2601 2.25012 13.8247 2.25012 13.2483C2.25012 12.9485 2.26001 12.6525 2.27979 12.3683C2.29907 12.0895 2.3385 11.7832 2.39697 11.4578C2.45471 11.1363 2.5282 10.8347 2.6156 10.5616C2.69946 10.2998 2.81384 10.0405 2.95569 9.79077C3.09106 9.55273 3.24683 9.34851 3.4187 9.18396C3.57947 9.03003 3.7821 8.90405 4.02087 8.80957C4.2417 8.72217 4.48987 8.67431 4.75928 8.66711C4.79211 8.68457 4.85059 8.71789 4.94531 8.77966C5.13806 8.90527 5.36023 9.04858 5.60583 9.20544C5.88269 9.38195 6.23938 9.54138 6.66553 9.67895C7.1012 9.81982 7.54553 9.89135 7.98657 9.89135C8.42761 9.89135 8.87207 9.81982 9.3075 9.67907C9.73401 9.54126 10.0906 9.38195 10.3678 9.2052C10.6191 9.04455 10.8351 8.90539 11.0278 8.77966C11.1226 8.71802 11.181 8.68457 11.2139 8.66711C11.4834 8.67431 11.7316 8.72217 11.9525 8.80957C12.1912 8.90405 12.3938 9.03015 12.5546 9.18396C12.7264 9.34839 12.8822 9.55261 13.0176 9.79089C13.1595 10.0405 13.274 10.2999 13.3578 10.5615C13.4453 10.835 13.5189 11.1365 13.5765 11.4576C13.6349 11.7837 13.6744 12.0901 13.6937 12.3684V12.3686C13.7136 12.6517 13.7236 12.9476 13.7238 13.2483C13.7236 13.8248 13.5608 14.2601 13.2257 14.579Z"
        fill="currentColor"
      />
    </svg>
  );
}
