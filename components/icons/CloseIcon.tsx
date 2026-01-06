interface CloseIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function CloseIcon({ className = "h-5 w-5", strokeWidth = 1.5 }: CloseIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
















