import StatsCard from "../../../components/ui/StatCard";
import { TEACHER_PROFILE_STATS } from "../constants/profileStats.constants";
import { getValue } from "../utils/profileFormatters";

const getAdvisorClassroomLabel = (classroom) => {
    const classroomName = getValue(
        classroom,
        ["classroomName", "ClassroomName", "className", "ClassName", "name", "Name"],
        ""
    );

    if (classroomName) {
        return classroomName;
    }

    const grade = getValue(classroom, ["grade", "Grade"], "");
    const section = getValue(classroom, ["section", "Section"], "");

    if (grade && section) {
        return `${grade}/${String(section).toLocaleUpperCase("tr-TR")}`;
    }

    if (grade) {
        return `${grade}. Sınıf`;
    }

    return "-";
};

function TeacherProfileStatsCards({ profile, details }) {
    const teacherLessons = details?.teacherLessons || [];
    const advisorClassrooms = details?.advisorClassrooms || [];
    const clubs = details?.clubs || [];

    const branch = getValue(
        profile,
        ["branchLessonName", "BranchLessonName", "department", "Department"],
        "Branş atanmadı"
    );

    const advisorClassroomLabel =
        advisorClassrooms.length > 0
            ? advisorClassrooms.map(getAdvisorClassroomLabel).join(", ")
            : "-";

    const statValues = {
        branch,
        teacherLessons: teacherLessons.length || "-",
        advisorClassrooms: advisorClassroomLabel,
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