import {
    AcademicCapIcon,
    BookOpenIcon,
    CalendarDaysIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserCircleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../../components/ui/StatCard";
import EmptyProfileState from "./EmptyProfileState";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileSection from "./ProfileSection";
import TeacherProfileStatsCards from "./TeacherProfileStatsCards";

import {
    formatDate,
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
            <TeacherProfileStatsCards profile={profile} details={details} />

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Öğretmenin sistemde kayıtlı temel bilgileri"
                icon={UserCircleIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard
                        icon={UserCircleIcon}
                        label="Ad Soyad"
                        value={getFullName(profile)}
                    />

                    <ProfileInfoCard icon={BookOpenIcon} label="Branş" value={branch} />

                    <ProfileInfoCard
                        icon={EnvelopeIcon}
                        label="E-posta"
                        value={getEmail(profile)}
                    />

                    <ProfileInfoCard
                        icon={PhoneIcon}
                        label="Telefon"
                        value={getPhoneNumber(profile)}
                    />
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
                                            <span
                                                className={`badge rounded-xl px-3 py-3 text-xs font-semibold ${item?.isActive === false || item?.IsActive === false
                                                    ? "badge-error"
                                                    : "badge-success"
                                                    }`}
                                            >
                                                {item?.isActive === false || item?.IsActive === false
                                                    ? "Pasif"
                                                    : "Aktif"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Kulüp Bilgileri"
                description="Öğretmenin sorumlu olduğu kulüp bilgileri"
                icon={UserGroupIcon}
            >
                {clubs.length === 0 ? (
                    <EmptyProfileState text="Bu öğretmene ait kulüp sorumluluğu bulunamadı." />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {clubs.map((club, index) => {
                            const isActive = !(
                                club?.isActive === false || club?.IsActive === false
                            );

                            const memberCount = getValue(
                                club,
                                ["memberCount", "MemberCount"],
                                "0"
                            );

                            return (
                                <StatCard
                                    key={getValue(club, ["id", "Id"], index)}
                                    icon={UserGroupIcon}
                                    title="Kulüp Sorumluluğu"
                                    value={getValue(
                                        club,
                                        ["clubName", "ClubName", "name", "Name"],
                                        "Kulüp adı bulunamadı"
                                    )}
                                    description={`Üye Sayısı: ${memberCount}`}
                                    color={isActive ? "success" : "error"}
                                    valueClassName="text-base"
                                />
                            );
                        })}
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Etkinlik Bilgileri"
                description="Öğretmenin sorumlu olduğu etkinlik bilgileri"
                icon={CalendarDaysIcon}
            >
                {events.length === 0 ? (
                    <EmptyProfileState text="Bu öğretmene ait etkinlik sorumluluğu bulunamadı." />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {events.map((event, index) => {
                            const isActive = !(
                                event?.isActive === false || event?.IsActive === false
                            );

                            const eventDate = formatDate(
                                getValue(event, ["eventDate", "EventDate", "date", "Date"], "")
                            );

                            return (
                                <StatCard
                                    key={getValue(event, ["id", "Id"], index)}
                                    icon={CalendarDaysIcon}
                                    title="Etkinlik Sorumluluğu"
                                    value={getValue(
                                        event,
                                        ["eventName", "EventName", "name", "Name"],
                                        "Etkinlik adı bulunamadı"
                                    )}
                                    description={`Tarih: ${eventDate || "-"} • Durum: ${isActive ? "Aktif" : "Pasif"
                                        }`}
                                    color={isActive ? "info" : "error"}
                                    valueClassName="text-base"
                                />
                            );
                        })}
                    </div>
                )}
            </ProfileSection>
        </div>
    );
}

export default TeacherProfileDetails;