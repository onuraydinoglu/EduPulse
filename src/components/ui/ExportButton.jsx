import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function ExportButton({
  children = "Export",
  icon: Icon = ArrowDownTrayIcon,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex h-11 items-center justify-center gap-2 rounded-xl
        border border-gray-200 bg-white px-5
        text-sm font-semibold text-gray-600
        shadow-sm transition-all duration-200
        hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900
        active:scale-[0.98] cursor-pointer
        ${className}
      `}
    >
      {Icon && <Icon className="h-5 w-5" />}

      <span>{children}</span>
    </button>
  );
}

export default ExportButton;