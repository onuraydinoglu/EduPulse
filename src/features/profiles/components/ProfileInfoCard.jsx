function ProfileInfoCard({ icon: Icon, label, value }) {
    return (
        <div className="rounded-2xl border border-base-300/60 bg-base-100/80 p-4 shadow-sm">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <div className="min-w-0">
                    <p className="text-xs font-semibold text-base-content/50">{label}</p>
                    <p className="mt-1 truncate text-sm font-bold text-base-content">
                        {value || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfoCard;