function ProfileInfoPanel({ items = [] }) {
    return (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={`${item.label}-${index}`}
                            className="flex items-center gap-3 border-b border-base-300/70 pb-4 last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0"
                        >
                            {Icon && (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-base-content/50">
                                    {item.label}
                                </p>

                                <p className="mt-1 truncate text-base font-bold text-base-content">
                                    {item.value || "-"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProfileInfoPanel;