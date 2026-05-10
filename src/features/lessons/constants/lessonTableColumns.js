import {
    BookOpenIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import { getLessonStatus } from "../utils/lessonFormatters";

export const getLessonStats = (lessons = []) => {
    const activeCount = lessons.filter(
        (lesson) => getLessonStatus(lesson) === "aktif"
    ).length;

    const passiveCount = lessons.filter(
        (lesson) => getLessonStatus(lesson) !== "aktif"
    ).length;

    return [
        {
            title: "Toplam Ders",
            value: lessons.length,
            description: "Okulunuza kayıtlı toplam ders sayısı",
            icon: BookOpenIcon,
            color: "primary",
        },
        {
            title: "Aktif Ders",
            value: activeCount,
            description: "Kullanımda olan ders kayıtları",
            icon: CheckCircleIcon,
            color: "success",
        },
        {
            title: "Pasif Ders",
            value: passiveCount,
            description: "Pasife alınmış ders kayıtları",
            icon: XCircleIcon,
            color: "warning",
        },
        {
            title: "Listelenen Ders",
            value: lessons.length,
            description: "Filtre öncesi toplam kayıt sayısı",
            icon: ClipboardDocumentListIcon,
            color: "info",
        },
    ];
};