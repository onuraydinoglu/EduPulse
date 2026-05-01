function StatusBadge({ status }) {
  const isActive = status === "Aktif";

  return (
    <span
      className={`badge ${isActive ? "badge-success" : "badge-error"
        } badge-outline`}
    >
      {isActive ? "Aktif" : "Pasif"}
    </span>
  );
}

export default StatusBadge;