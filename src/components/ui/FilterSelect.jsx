function FilterSelect({
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <select
      className={`select select-bordered rounded-xl ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;