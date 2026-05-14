import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    EnvelopeIcon,
    HashtagIcon,
    PhoneIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

export const STUDENT_PROFILE_STATS = [
    {
        key: "studentNumber",
        title: "Öğrenci No",
        icon: HashtagIcon,
        color: "primary",
    },
    {
        key: "classroomName",
        title: "Sınıf",
        icon: AcademicCapIcon,
        color: "success",
    },
    {
        key: "classroomTeacher",
        title: "Sınıf Öğretmeni",
        icon: UserCircleIcon,
        color: "warning",
        valueClassName: "text-xl",
    },
    {
        key: "generalAverage",
        title: "Genel Ortalama",
        icon: ChartBarIcon,
        color: "info",
    },
];

export const TEACHER_PROFILE_STATS = [
    {
        key: "branch",
        title: "Branş",
        icon: BookOpenIcon,
        color: "primary",
        valueClassName: "text-xl",
    },
    {
        key: "teacherLessons",
        title: "Ders Ataması",
        icon: AcademicCapIcon,
        color: "success",
    },
    {
        key: "advisorClassrooms",
        title: "Danışman Sınıf",
        icon: ClipboardDocumentCheckIcon,
        color: "warning",
    },
    {
        key: "clubs",
        title: "Sorumlu Kulüp",
        icon: UserGroupIcon,
        color: "info",
    },
];

export const OFFICER_PROFILE_STATS = [
    {
        key: "fullName",
        title: "Ad Soyad",
        icon: UserCircleIcon,
        color: "primary",
        valueClassName: "text-xl",
    },
    {
        key: "roleName",
        title: "Rol",
        icon: ShieldCheckIcon,
        color: "success",
    },
    {
        key: "email",
        title: "E-posta",
        icon: EnvelopeIcon,
        color: "warning",
        valueClassName: "text-base",
    },
    {
        key: "phoneNumber",
        title: "Telefon",
        icon: PhoneIcon,
        color: "info",
        valueClassName: "text-xl",
    },
];