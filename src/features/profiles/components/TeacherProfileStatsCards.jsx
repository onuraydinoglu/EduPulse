import StatsCard from "../../../components/ui/StatCard";
import { TEACHER_PROFILE_STATS } from "../constants/profileStats.constants";
import { getValue } from "../utils/profileFormatters";

function TeacherProfileStatsCards({ profile, details }) {
    const teacherLessons = details?.teacherLessons || [];
    const advisorClassrooms = details?.advisorClassrooms || [];
    const clubs = details?.clubs || [];

    const branch = getValue(
        profile,
        ["branchLessonName", "BranchLessonName", "department", "Department"],
        "Branş atanmadı"
    );

    const statValues = {
        branch,
        teacherLessons: teacherLessons.length || "-",
        advisorClassrooms: advisorClassrooms.length || "-",
        clubs: clubs.length || "-",
    };

    const stats = TEACHER_PROFILE_STATS.map((item) => ({
        ...item,
        value: statValues[item.key],
    }));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {stats.map((item) => (
                <StatsCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default TeacherProfileStatsCards;