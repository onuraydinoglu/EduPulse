function ActiveCheckbox({ checked, onChange, className = "" }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between rounded-xl border border-base-300 bg-base-100 px-4 py-3 ${className}`}
    >
      <div>
        <p className="text-sm font-semibold text-base-content">Aktiflik Durumu</p>
        <p className="text-xs text-base-content/60">
          Kayıt aktif olarak kullanılsın
        </p>
      </div>

      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default ActiveCheckbox;