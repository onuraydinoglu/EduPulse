function ExamStatsCards({ items = [] }) {
    if (!items.length) return null;

    const getColorClass = (color) => {
        const classes = {
            primary: "bg-primary/10 text-primary",
            success: "bg-success/10 text-success",
            warning: "bg-warning/10 text-warning",
            error: "bg-error/10 text-error",
            info: "bg-info/10 text-info",
        };

        return classes[color] || classes.primary;
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-base-content/60">{item.title}</p>
                                <p className="mt-2 text-3xl font-bold text-base-content">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-xs text-base-content/50">
                                    {item.description}
                                </p>
                            </div>

                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${getColorClass(
                                    item.color,
                                )}`}
                            >
                                <Icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ExamStatsCards;