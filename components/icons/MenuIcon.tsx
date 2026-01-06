interface MenuIconProps {
  className?: string;
  strokeWidth?: number;
}

export default function MenuIcon({ className = "h-5 w-5", strokeWidth = 1.5 }: MenuIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/20000/svg"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
















