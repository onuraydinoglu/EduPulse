function FormSelect({
  label,
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className={className}>
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>

      <div className="rounded-xl transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
        <select
          className="select w-full rounded-xl border border-gray-200 bg-white pl-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:outline-none focus:ring-0 focus-visible:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seçiniz</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FormSelect;