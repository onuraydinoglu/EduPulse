import {
    AcademicCapIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    HashtagIcon,
} from "@heroicons/react/24/outline";

import ProfileStatsCard from "./ProfileStatsCard";
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

    const stats = [
        {
            title: "Öğrenci No",
            value: studentNumber,
            icon: HashtagIcon,
            variant: "blue",
        },
        {
            title: "Sınıf",
            value: classroomName,
            icon: AcademicCapIcon,
            variant: "emerald",
        },
        {
            title: "Ders Sayısı",
            value: grades.length || "-",
            icon: ClipboardDocumentCheckIcon,
            variant: "amber",
        },
        {
            title: "Genel Ortalama",
            value: generalAverage,
            icon: ChartBarIcon,
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

export default StudentProfileStatsCards;