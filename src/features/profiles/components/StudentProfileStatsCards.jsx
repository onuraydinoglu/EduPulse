import StatsCard from "../../../components/ui/StatCard";
import { STUDENT_PROFILE_STATS } from "../constants/profileStats.constants";
import { getValue } from "../utils/profileFormatters";

function StudentProfileStatsCards({ profile, details }) {
    const grades = details?.grades || [];

    const studentNumber = getValue(
        profile,
        ["studentNumber", "StudentNumber"],
        "-"
    );

    const classroomName = getValue(
        profile,
        ["classroomName", "ClassroomName", "className", "ClassName"],
        "-"
    );

    const classroomTeacher = getValue(
        profile,
        [
            "classroomTeacherName",
            "ClassroomTeacherName",
            "advisorTeacherName",
            "AdvisorTeacherName",
            "teacherName",
            "TeacherName",
        ],
        "-"
    );

    const validAverages = grades
        .map((grade) => Number(getValue(grade, ["average", "Average"], "")))
        .filter((value) => !Number.isNaN(value));

    const generalAverage =
        validAverages.length > 0
            ? (
                validAverages.reduce((total, value) => total + value, 0) /
                validAverages.length
            ).toFixed(2)
            : "-";

    const statValues = {
        studentNumber,
        classroomName,
        classroomTeacher,
        generalAverage,
    };

    const stats = STUDENT_PROFILE_STATS.map((item) => ({
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

export default StudentProfileStatsCards;