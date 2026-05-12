function StatusBadge({ status = "" }) {
  const normalizedStatus = String(status)
    .toLocaleLowerCase("tr-TR")
    .trim();

  const variants = {
    aktif: "badge-success",
    pasif: "badge-error",
    izinde: "badge-warning",
    izinli: "badge-warning",
  };

  const labels = {
    aktif: "Aktif",
    pasif: "Pasif",
    izinde: "İzinde",
    izinli: "İzinli",
  };

  return (
    <span
      className={`badge ${variants[normalizedStatus] || "badge-neutral"
        } badge-outline`}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
}

export default StatusBadge;