import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput({
  value,
  onChange,
  placeholder = "Ara...",
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          sm:w-80
          rounded-xl
          border
          border-gray-200
          bg-white
          pl-11
          pr-4
          text-sm
          text-gray-700
          outline-none
          transition
          focus:border-blue-400
          focus:ring-4
          focus:ring-blue-50
        "
      />
    </div>
  );
}

export default SearchInput;