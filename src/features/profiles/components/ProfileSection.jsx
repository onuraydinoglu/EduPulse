function ProfileSection({ title, description, icon: Icon, children }) {
    return (
        <section className="rounded-3xl border border-base-300/60 bg-base-100/90 p-5 shadow-sm">
            <div className="mb-5 flex items-start gap-3">
                {Icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-bold text-base-content">{title}</h2>

                    {description && (
                        <p className="mt-1 text-sm text-base-content/55">{description}</p>
                    )}
                </div>
            </div>

            {children}
        </section>
    );
}

export default ProfileSection;