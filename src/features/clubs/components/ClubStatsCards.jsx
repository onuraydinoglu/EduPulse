function ClubStatsCards({ clubs }) {
    const totalCount = clubs.length;

    const activeCount = clubs.filter(
        (club) => club.isActive ?? club.IsActive ?? true,
    ).length;

    const passiveCount = totalCount - activeCount;

    const totalMemberCount = clubs.reduce((total, club) => {
        const memberCount =
            club.memberCount ??
            club.MemberCount ??
            club.clubMemberCount ??
            club.ClubMemberCount ??
            0;

        return total + Number(memberCount);
    }, 0);

    const cards = [
        {
            title: "Toplam Kulüp",
            value: totalCount,
            description: "Sistemde kayıtlı kulüp",
        },
        {
            title: "Aktif Kulüp",
            value: activeCount,
            description: "Aktif olarak kullanılan kulüp",
        },
        {
            title: "Pasif Kulüp",
            value: passiveCount,
            description: "Pasif durumdaki kulüp",
        },
        {
            title: "Toplam Üye",
            value: totalMemberCount,
            description: "Kulüplerde kayıtlı öğrenci",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm"
                >
                    <p className="text-sm font-medium text-base-content/60">
                        {card.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-base-content">
                        {card.value}
                    </p>

                    <p className="mt-1 text-xs text-base-content/50">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ClubStatsCards;