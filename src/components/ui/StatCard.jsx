function StatCard({ title, value, icon, description, color = "primary" }) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-info/10 text-info",
  };

  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-base-content/60">
              {title}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {value}
            </h3>

            {description && (
              <p className="mt-2 text-xs text-base-content/50">
                {description}
              </p>
            )}
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${colorClasses[color]}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;