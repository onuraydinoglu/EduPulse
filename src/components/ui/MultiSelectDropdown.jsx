import { useEffect, useRef, useState } from "react";

function MultiSelectDropdown({
  label,
  value = [],
  options = [],
  onChange,
  placeholder = "Seçiniz",
  emptyText = "Kayıt bulunamadı",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedValues = Array.isArray(value) ? value : [];

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  const selectedText =
    selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleOption = (optionValue) => {
    if (selectedValues.includes(optionValue)) {
      onChange(selectedValues.filter((item) => item !== optionValue));
      return;
    }

    onChange([...selectedValues, optionValue]);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange([]);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-left text-sm text-gray-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-50"
      >
        <span
          className={`block truncate pr-3 ${
            selectedValues.length > 0 ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {selectedText}
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {selectedValues.length > 0 && (
            <span
              onClick={handleClear}
              className="flex h-5 w-5 items-center justify-center rounded-full text-sm text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              title="Seçimleri temizle"
            >
              ×
            </span>
          )}

          <svg
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">{emptyText}</div>
          ) : (
            options.map((option) => {
              const isSelected = selectedValues.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggleOption(option.value)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-200 bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>

                  <span className="truncate">{option.label}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
