import StatCard from "../../../components/ui/StatCard";

function TeacherLessonStatsCards({ items = [] }) {
    if (!items.length) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item) => (
                <StatCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default TeacherLessonStatsCards;