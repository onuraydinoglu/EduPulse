import {
    AcademicCapIcon,
    BookOpenIcon,
    CheckCircleIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";

import { getTeacherStatus } from "../utils/teacherFormatters";

export const getTeacherStats = (teachers = [], temporaryPasswords = {}) => {
    const activeCount = teachers.filter(
        (teacher) => getTeacherStatus(teacher) === "aktif"
    ).length;

    const passiveCount = teachers.filter(
        (teacher) => getTeacherStatus(teacher) !== "aktif"
    ).length;

    const branchAssignedCount = teachers.filter((teacher) => {
        const branch =
            teacher.branchLessonName ||
            teacher.BranchLessonName ||
            teacher.department ||
            teacher.Department;

        return Boolean(branch);
    }).length;

    return [
        {
            title: "Toplam Öğretmen",
            value: teachers.length,
            description: "Sistemde kayıtlı öğretmen sayısı",
            icon: AcademicCapIcon,
            color: "primary",
        },
        {
            title: "Aktif Öğretmen",
            value: activeCount,
            description: "Aktif olarak görev yapan öğretmenler",
            icon: CheckCircleIcon,
            color: "success",
        },
        {
            title: "Branşı Olan",
            value: branchAssignedCount,
            description: "Branş veya bölüm bilgisi bulunanlar",
            icon: BookOpenIcon,
            color: "info",
        },
        {
            title: "Geçici Şifre",
            value: Object.keys(temporaryPasswords || {}).length,
            description: "Bu oturumda oluşturulan geçici şifreler",
            icon: KeyIcon,
            color: passiveCount > 0 ? "warning" : "primary",
        },
    ];
};