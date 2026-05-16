import StatCard from "../../../components/ui/StatCard";

function ReportStatsCards({ items = [], className = "grid gap-4 md:grid-cols-2 xl:grid-cols-4" }) {
    if (!items.length) return null;

    return (
        <div className={className}>
            {items.map((item) => (
                <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    description={item.description}
                    color={item.color}
                    icon={item.icon}
                />
            ))}
        </div>
    );
}

export default ReportStatsCards;