function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary: "btn-gradient",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    error: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;