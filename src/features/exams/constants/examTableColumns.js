import {
    AcademicCapIcon,
    CheckCircleIcon,
    ClipboardDocumentCheckIcon,
    PencilSquareIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export const examTableHeaders = [
    "Öğrenci",
    "1. Sınav",
    "2. Sınav",
    "Proje",
    "Sınıf İçi 1",
    "Sınıf İçi 2",
    "Sınıf İçi 3",
    "Ortalama",
    "İşlem",
];

export const getExamStats = (rows = []) => {
    const savedCount = rows.filter((row) => row.examId).length;
    const changedCount = rows.filter((row) => row.isDirty).length;
    const missingCount = Math.max(rows.length - savedCount, 0);
    const passedCount = rows.filter((row) => Number(row.average || 0) >= 50).length;

    return [
        {
            title: "Toplam Öğrenci",
            value: rows.length,
            description: "Seçili sınıftaki öğrenci",
            icon: AcademicCapIcon,
            color: "primary",
        },
        {
            title: "Kayıtlı Not",
            value: savedCount,
            description: "Seçili derste notu olan",
            icon: CheckCircleIcon,
            color: "success",
        },
        {
            title: "Bekleyen",
            value: changedCount,
            description: "Kaydedilmemiş değişiklik",
            icon: PencilSquareIcon,
            color: "warning",
        },
        {
            title: "Eksik",
            value: missingCount,
            description: "Henüz not girilmemiş",
            icon: XCircleIcon,
            color: "error",
        },
        {
            title: "Başarılı",
            value: passedCount,
            description: "Ortalaması 50 ve üzeri",
            icon: ClipboardDocumentCheckIcon,
            color: "info",
        },
    ];
};

export const examPdfColumns = [
    {
        header: "#",
        accessor: "index",
    },
    {
        header: "Öğrenci",
        accessor: (row) => row.studentFullName,
    },
    {
        header: "Numara",
        accessor: (row) => row.studentNumber,
    },
    {
        header: "1. Sınav",
        accessor: (row) => row.exam1 || "-",
    },
    {
        header: "2. Sınav",
        accessor: (row) => row.exam2 || "-",
    },
    {
        header: "Proje",
        accessor: (row) => row.project || "-",
    },
    {
        header: "Ortalama",
        accessor: (row) => row.averageLabel,
    },
];