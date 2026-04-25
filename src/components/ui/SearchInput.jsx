function SearchInput({
  value,
  onChange,
  placeholder = "Ara...",
  className = "",
}) {
  return (
    <label className={`input input-bordered flex items-center gap-2 rounded-xl ${className}`}>
      <span className="text-base-content/40">🔍</span>

      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default SearchInput;