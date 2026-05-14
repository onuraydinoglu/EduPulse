const variantMap = {
    blue: {
        accent: "#3b82f6",
        iconBg: "#eff6ff",
        iconText: "#2563eb",
    },
    emerald: {
        accent: "#10b981",
        iconBg: "#ecfdf5",
        iconText: "#059669",
    },
    amber: {
        accent: "#f59e0b",
        iconBg: "#fffbeb",
        iconText: "#d97706",
    },
    sky: {
        accent: "#0ea5e9",
        iconBg: "#f0f9ff",
        iconText: "#0284c7",
    },
    rose: {
        accent: "#f43f5e",
        iconBg: "#fff1f2",
        iconText: "#e11d48",
    },
};

function ProfileStatsCard({
    icon: Icon,
    title,
    value,
    description,
    variant = "blue",
    valueClassName = "text-2xl",
}) {
    const color = variantMap[variant] || variantMap.blue;

    return (
        <div
            className="rounded-3xl border border-base-300 bg-base-100 px-5 py-4 shadow-sm"
            style={{
                borderLeftWidth: "5px",
                borderLeftStyle: "solid",
                borderLeftColor: color.accent,
            }}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-base-content/60">
                        {title}
                    </p>

                    <h3
                        className={`mt-3 truncate font-bold leading-none tracking-tight text-base-content ${valueClassName}`}
                        title={String(value ?? "-")}
                    >
                        {value ?? "-"}
                    </h3>

                    {description && (
                        <p className="mt-3 line-clamp-1 text-xs font-medium text-base-content/50">
                            {description}
                        </p>
                    )}
                </div>

                {Icon && (
                    <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                            backgroundColor: color.iconBg,
                        }}
                    >
                        <Icon
                            className="h-6 w-6"
                            style={{
                                color: color.iconText,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileStatsCard;