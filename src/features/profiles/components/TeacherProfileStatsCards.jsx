import {
    AcademicCapIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

import ProfileStatsCard from "./ProfileStatsCard";
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

    const stats = [
        {
            title: "Branş",
            value: branch,
            icon: BookOpenIcon,
            variant: "blue",
            valueClassName: "text-xl",
        },
        {
            title: "Ders Ataması",
            value: teacherLessons.length || "-",
            icon: AcademicCapIcon,
            variant: "emerald",
        },
        {
            title: "Danışman Sınıf",
            value: advisorClassrooms.length || "-",
            icon: ClipboardDocumentCheckIcon,
            variant: "amber",
        },
        {
            title: "Sorumlu Kulüp",
            value: clubs.length || "-",
            icon: UserGroupIcon,
            variant: "sky",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {stats.map((item) => (
                <ProfileStatsCard key={item.title} {...item} />
            ))}
        </div>
    );
}

export default TeacherProfileStatsCards;