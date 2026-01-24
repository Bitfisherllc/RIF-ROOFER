interface ArrowRightIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function ArrowRightIcon({ className = "h-5 w-5", strokeWidth = 1.5 }: ArrowRightIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

















