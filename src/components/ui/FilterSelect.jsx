import { useEffect, useRef, useState } from "react";

function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  error,
  className = "",
  hideLabel = false,
  placeholder = "Seçiniz",
  dropdownDirection = "down",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {!hideLabel && label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-50 items-center justify-between rounded-xl border bg-white px-4 text-left text-sm font-normal outline-none transition ${error
          ? "border-rose-400 text-rose-600 ring-4 ring-rose-50"
          : "border-gray-200 text-gray-700 shadow-sm hover:border-blue-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          }`}
      >
        <span>{selectedOption?.label || placeholder}</span>

        <svg
          className={`h-4 w-4 text-gray-500 transition ${open ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 z-50 w-50 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl ${dropdownDirection === "up" ? "bottom-full mb-2" : "mt-2"
            }`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-normal transition ${isSelected
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <span className="w-4 text-center text-xs">
                  {isSelected ? "✓" : ""}
                </span>

                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
}

export default FilterSelect;