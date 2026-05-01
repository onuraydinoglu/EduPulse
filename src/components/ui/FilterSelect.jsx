function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  error,
  className = "",
  hideLabel = false,
}) {
  return (
    <div className={className}>
      {!hideLabel && label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`relative rounded-xl transition ${error
          ? "focus-within:ring-4 focus-within:ring-rose-50"
          : "focus-within:ring-4 focus-within:ring-blue-50"
          }`}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition ${error
            ? "border-rose-400 focus:border-rose-500"
            : "border-gray-200 hover:border-blue-300 focus:border-blue-400"
            }`}
        >
          <option value="">Seçiniz</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
}

export default FilterSelect;