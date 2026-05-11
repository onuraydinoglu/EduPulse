import StatCard from "../../../components/ui/StatCard";

function EventStatsCards({ items = [] }) {
    if (!items.length) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
                <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    description={item.description}
                />
            ))}
        </div>
    );
}

export default EventStatsCards;