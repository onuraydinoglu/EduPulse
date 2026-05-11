import StatCard from "../../../components/ui/StatCard";

function ClubStatsCards({ items = [] }) {
    if (!items.length) return null;

    return (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
                <StatCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default ClubStatsCards;