import StatCard from "../../../components/ui/StatCard";

function TableStatsCards({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}

export default TableStatsCards;