function FormSelect({
  label,
  value,
  onChange,
  options = [],
  className = "",
  placeholder = "Seçiniz",
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered h-11 w-full rounded-xl border-gray-200 bg-white text-sm text-gray-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-50"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;