interface CheckIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function CheckIcon({ className = "h-5 w-5", strokeWidth = 2 }: CheckIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
















