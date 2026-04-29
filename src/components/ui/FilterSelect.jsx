function FormSelect({
  label,
  value,
  onChange,
  options = [],
  error,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-gray-700 outline-none transition
          ${error
            ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
            : "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          }`}
      >
        <option value="">Seçiniz</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormSelect;