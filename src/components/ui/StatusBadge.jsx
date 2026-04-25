function StatusBadge({ status }) {
  const isActive = status === "Aktif";

  return (
    <span
      className={`badge rounded-lg ${isActive ? "badge-success" : "badge-error"
        }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;