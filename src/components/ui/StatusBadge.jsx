function StatusBadge({ status = "" }) {
  const normalizedStatus = String(status).toLowerCase();

  const variants = {
    aktif: "badge-success",
    pasif: "badge-error",
    izinde: "badge-warning",
  };

  return (
    <span
      className={`badge ${variants[normalizedStatus] || "badge-neutral"
        } badge-outline`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;