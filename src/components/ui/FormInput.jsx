function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full rounded-xl border border-gray-200 bg-white pl-3 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default FormInput;