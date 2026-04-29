function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-gray-700 outline-none transition
          ${error
            ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-50"
            : "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          }`}
      />

      {error && (
        <p className="mt-1 text-xs font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;