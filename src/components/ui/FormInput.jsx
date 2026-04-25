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
        className="input input-bordered w-full rounded-xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default FormInput;