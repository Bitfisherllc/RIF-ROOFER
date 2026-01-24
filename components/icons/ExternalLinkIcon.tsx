interface ExternalLinkIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function ExternalLinkIcon({ className = "h-5 w-5", strokeWidth = 1.5 }: ExternalLinkIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

















