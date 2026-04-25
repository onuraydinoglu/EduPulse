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

      <select
        className="select select-bordered w-full rounded-xl"
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
  );
}

export default FormSelect;