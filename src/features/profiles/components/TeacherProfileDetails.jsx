import {
    AcademicCapIcon,
    BookOpenIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserCircleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

import EmptyProfileState from "./EmptyProfileState";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileSection from "./ProfileSection";
import {
    getEmail,
    getFullName,
    getPhoneNumber,
    getValue,
} from "../utils/profileFormatters";

function TeacherProfileDetails({ profile, details }) {
    const teacherLessons = details?.teacherLessons || [];
    const advisorClassrooms = details?.advisorClassrooms || [];
    const clubs = details?.clubs || [];
    const events = details?.events || [];

    const branch = getValue(
        profile,
        ["branchLessonName", "BranchLessonName", "department", "Department"],
        "Branş atanmadı"
    );

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ProfileInfoCard icon={BookOpenIcon} label="Branş" value={branch} />
                <ProfileInfoCard icon={AcademicCapIcon} label="Ders Ataması" value={teacherLessons.length} />
                <ProfileInfoCard icon={UserGroupIcon} label="Danışman Sınıf" value={advisorClassrooms.length} />
                <ProfileInfoCard icon={UserGroupIcon} label="Sorumlu Kulüp" value={clubs.length} />
            </div>

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Öğretmenin sistemde kayıtlı temel bilgileri"
                icon={UserCircleIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard icon={UserCircleIcon} label="Ad Soyad" value={getFullName(profile)} />
                    <ProfileInfoCard icon={BookOpenIcon} label="Branş" value={branch} />
                    <ProfileInfoCard icon={EnvelopeIcon} label="E-posta" value={getEmail(profile)} />
                    <ProfileInfoCard icon={PhoneIcon} label="Telefon" value={getPhoneNumber(profile)} />
                </div>
            </ProfileSection>

            <ProfileSection
                title="Ders Atamaları"
                description="Öğretmenin sınıflara göre verdiği dersler"
                icon={BookOpenIcon}
            >
                {teacherLessons.length === 0 ? (
                    <EmptyProfileState text="Bu öğretmene ait ders ataması bulunamadı." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/60">
                                    <th>Ders</th>
                                    <th>Sınıf</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teacherLessons.map((item, index) => (
                                    <tr key={getValue(item, ["id", "Id"], index)}>
                                        <td className="font-semibold">
                                            {getValue(item, ["lessonName", "LessonName"], "-")}
                                        </td>
                                        <td>
                                            {getValue(
                                                item,
                                                ["classroomName", "ClassroomName", "className", "ClassName"],
                                                "-"
                                            )}
                                        </td>
                                        <td>
                                            {item?.isActive === false || item?.IsActive === false ? "Pasif" : "Aktif"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Danışman Olduğu Sınıflar"
                description="Öğretmenin sınıf danışmanlığı kayıtları"
                icon={AcademicCapIcon}
            >
                {advisorClassrooms.length === 0 ? (
                    <EmptyProfileState text="Bu öğretmene atanmış danışman sınıf bulunamadı." />
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {advisorClassrooms.map((classroom, index) => (
                            <div
                                key={getValue(classroom, ["id", "Id"], index)}
                                className="rounded-2xl border border-base-300/60 bg-base-100 p-4 shadow-sm"
                            >
                                <p className="text-sm font-bold text-base-content">
                                    {getValue(
                                        classroom,
                                        ["classroomName", "ClassroomName", "className", "ClassName", "name", "Name"],
                                        `${getValue(classroom, ["grade", "Grade"], "")}/${getValue(
                                            classroom,
                                            ["section", "Section"],
                                            ""
                                        )}`
                                    )}
                                </p>

                                <p className="mt-1 text-xs text-base-content/50">
                                    Sınıf danışmanlığı
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Kulüp ve Etkinlik Sorumlulukları"
                description="Öğretmenin sorumlu olduğu kulüp ve etkinlik kayıtları"
                icon={UserGroupIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard icon={UserGroupIcon} label="Kulüp Sorumluluğu" value={clubs.length} />
                    <ProfileInfoCard icon={UserGroupIcon} label="Etkinlik Sorumluluğu" value={events.length} />
                </div>
            </ProfileSection>
        </div>
    );
}

export default TeacherProfileDetails;