function StatCard({ title, value, icon: Icon, description, color = "primary", }) {
  const colorClasses = {
    primary: {
      icon: "bg-blue-50 text-blue-600",
      accent: "bg-blue-500",
    },
    success: {
      icon: "bg-emerald-50 text-emerald-600",
      accent: "bg-emerald-500",
    },
    warning: {
      icon: "bg-amber-50 text-amber-600",
      accent: "bg-amber-500",
    },
    error: {
      icon: "bg-red-50 text-red-600",
      accent: "bg-red-500",
    },
    info: {
      icon: "bg-sky-50 text-sky-600",
      accent: "bg-sky-500",
    },
  };

  const currentColor =
    colorClasses[color] || colorClasses.primary;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">

      {/* SOL RENK BAR */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${currentColor.accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="xl:mt-1 2xl:mt-3 text-3xl font-semibold tracking-tight text-gray-950">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${currentColor.icon}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;