import {
    AcademicCapIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    EnvelopeIcon,
    HashtagIcon,
    PhoneIcon,
    UserCircleIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

import EmptyProfileState from "./EmptyProfileState";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileSection from "./ProfileSection";
import ProfileStatsCard from "./ProfileStatsCard";
import StudentProfileStatsCards from "./StudentProfileStatsCards";

import {
    formatDate,
    getEmail,
    getFullName,
    getPhoneNumber,
    getValue,
} from "../utils/profileFormatters";

function StudentProfileDetails({ profile, details }) {
    const grades = details?.grades || [];
    const trialExams = details?.trialExams || [];
    const clubMembers = details?.clubMembers || [];
    const eventMembers = details?.eventMembers || [];

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

    const getEventName = (eventMember) =>
        getValue(
            eventMember,
            [
                "eventName",
                "EventName",
                "name",
                "Name",
                "title",
                "Title",
            ],
            "Etkinlik adı bulunamadı"
        );

    const getEventLocation = (eventMember) =>
        getValue(
            eventMember,
            [
                "location",
                "Location",
                "eventLocation",
                "EventLocation",
                "place",
                "Place",
                "venue",
                "Venue",
                "address",
                "Address",
            ],
            "-"
        );

    const getEventDate = (eventMember) => {
        const rawDate = getValue(
            eventMember,
            [
                "eventDate",
                "EventDate",
                "date",
                "Date",
                "startDate",
                "StartDate",
                "startTime",
                "StartTime",
                "eventStartDate",
                "EventStartDate",
            ],
            ""
        );

        return formatDate(rawDate) || "-";
    };

    const getEventTime = (eventMember) => {
        const rawTime = getValue(
            eventMember,
            [
                "eventTime",
                "EventTime",
                "time",
                "Time",
                "startHour",
                "StartHour",
                "hour",
                "Hour",
            ],
            ""
        );

        if (rawTime) return String(rawTime).slice(0, 5);

        const rawDateTime = getValue(
            eventMember,
            [
                "eventDate",
                "EventDate",
                "date",
                "Date",
                "startDate",
                "StartDate",
                "startTime",
                "StartTime",
                "eventStartDate",
                "EventStartDate",
            ],
            ""
        );

        if (!rawDateTime || !String(rawDateTime).includes("T")) return "-";

        return String(rawDateTime).split("T")[1]?.slice(0, 5) || "-";
    };

    const getEventFee = (eventMember) => {
        const isPaid = getValue(
            eventMember,
            ["isPaid", "IsPaid", "paid", "Paid"],
            null
        );

        const price = getValue(
            eventMember,
            [
                "price",
                "Price",
                "fee",
                "Fee",
                "amount",
                "Amount",
                "eventPrice",
                "EventPrice",
                "participationFee",
                "ParticipationFee",
            ],
            null
        );

        if (isPaid === false || isPaid === "false") return "Ücretsiz";

        if (
            price === null ||
            price === undefined ||
            price === "" ||
            Number(price) === 0
        ) {
            return "Ücretsiz";
        }

        return `${price} TL`;
    };

    return (
        <div className="space-y-6">
            <StudentProfileStatsCards profile={profile} details={details} />

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Öğrencinin sistemde kayıtlı temel bilgileri"
                icon={UserCircleIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard
                        icon={UserCircleIcon}
                        label="Ad Soyad"
                        value={getFullName(profile)}
                    />

                    <ProfileInfoCard
                        icon={HashtagIcon}
                        label="Öğrenci Numarası"
                        value={studentNumber}
                    />

                    <ProfileInfoCard
                        icon={AcademicCapIcon}
                        label="Sınıf"
                        value={classroomName}
                    />

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
                title="Ders Notları"
                description="Öğrencinin ders bazlı sınav, proje, etkinlik ve ortalama bilgileri"
                icon={ClipboardDocumentCheckIcon}
            >
                {grades.length === 0 ? (
                    <EmptyProfileState text="Bu öğrenciye ait ders notu bulunamadı." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/60">
                                    <th>Ders</th>
                                    <th>1. Sınav</th>
                                    <th>2. Sınav</th>
                                    <th>Proje</th>
                                    <th>Etkinlik 1</th>
                                    <th>Etkinlik 2</th>
                                    <th>Etkinlik 3</th>
                                    <th>Ortalama</th>
                                </tr>
                            </thead>

                            <tbody>
                                {grades.map((grade, index) => (
                                    <tr key={getValue(grade, ["id", "Id"], index)}>
                                        <td className="font-semibold">
                                            {getValue(grade, ["lessonName", "LessonName"], "-")}
                                        </td>

                                        <td>{getValue(grade, ["exam1", "Exam1"], "-")}</td>
                                        <td>{getValue(grade, ["exam2", "Exam2"], "-")}</td>
                                        <td>{getValue(grade, ["project", "Project"], "-")}</td>
                                        <td>{getValue(grade, ["activity1", "Activity1"], "-")}</td>
                                        <td>{getValue(grade, ["activity2", "Activity2"], "-")}</td>
                                        <td>{getValue(grade, ["activity3", "Activity3"], "-")}</td>

                                        <td>
                                            <span className="badge badge-primary rounded-xl px-3 py-3 font-bold">
                                                {getValue(grade, ["average", "Average"], "-")}
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
                title="Deneme Sınavları"
                description="Öğrencinin deneme sınavı performans kayıtları"
                icon={ChartBarIcon}
            >
                {trialExams.length === 0 ? (
                    <EmptyProfileState text="Bu öğrenciye ait deneme sınavı sonucu bulunamadı." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/60">
                                    <th>Deneme</th>
                                    <th>Tarih</th>
                                    <th>Doğru</th>
                                    <th>Yanlış</th>
                                    <th>Boş</th>
                                    <th>Net</th>
                                    <th>Puan</th>
                                </tr>
                            </thead>

                            <tbody>
                                {trialExams.map((exam, index) => (
                                    <tr key={getValue(exam, ["id", "Id"], index)}>
                                        <td className="font-semibold">
                                            {getValue(
                                                exam,
                                                ["examName", "ExamName", "name", "Name"],
                                                "-"
                                            )}
                                        </td>

                                        <td>
                                            {formatDate(
                                                getValue(
                                                    exam,
                                                    ["examDate", "ExamDate", "date", "Date"],
                                                    ""
                                                )
                                            )}
                                        </td>

                                        <td>
                                            {getValue(
                                                exam,
                                                ["correctCount", "CorrectCount", "correct", "Correct"],
                                                "-"
                                            )}
                                        </td>

                                        <td>
                                            {getValue(
                                                exam,
                                                ["wrongCount", "WrongCount", "wrong", "Wrong"],
                                                "-"
                                            )}
                                        </td>

                                        <td>
                                            {getValue(
                                                exam,
                                                ["emptyCount", "EmptyCount", "blank", "Blank"],
                                                "-"
                                            )}
                                        </td>

                                        <td>
                                            <span className="badge badge-secondary rounded-xl px-3 py-3 font-bold">
                                                {getValue(exam, ["net", "Net"], "-")}
                                            </span>
                                        </td>

                                        <td>
                                            {getValue(
                                                exam,
                                                ["score", "Score", "point", "Point"],
                                                "-"
                                            )}
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
                description="Öğrencinin kayıtlı olduğu kulüp bilgileri"
                icon={UserGroupIcon}
            >
                {clubMembers.length === 0 ? (
                    <EmptyProfileState text="Bu öğrenciye ait kulüp kaydı bulunamadı." />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {clubMembers.map((clubMember, index) => {
                            const isActive = !(
                                clubMember?.isActive === false ||
                                clubMember?.IsActive === false
                            );

                            return (
                                <ProfileStatsCard
                                    key={getValue(clubMember, ["id", "Id"], index)}
                                    icon={UserGroupIcon}
                                    title="Kulüp Üyeliği"
                                    value={getValue(
                                        clubMember,
                                        ["clubName", "ClubName", "name", "Name"],
                                        "Kulüp adı bulunamadı"
                                    )}
                                    variant={isActive ? "emerald" : "rose"}
                                    valueClassName="text-base"
                                />
                            );
                        })}
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Etkinlik Bilgileri"
                description="Öğrencinin katıldığı etkinlik bilgileri"
                icon={CalendarDaysIcon}
            >
                {eventMembers.length === 0 ? (
                    <EmptyProfileState text="Bu öğrenciye ait etkinlik kaydı bulunamadı." />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {eventMembers.map((eventMember, index) => {
                            const isActive = !(
                                eventMember?.isActive === false ||
                                eventMember?.IsActive === false
                            );

                            return (
                                <ProfileStatsCard
                                    key={getValue(eventMember, ["id", "Id"], index)}
                                    icon={CalendarDaysIcon}
                                    title="Etkinlik Adı"
                                    value={getEventName(eventMember)}
                                    description={
                                        <div className="mt-2 space-y-1 text-sm leading-relaxed text-base-content/70">
                                            <p>
                                                <span className="font-semibold text-base-content">
                                                    Yer:
                                                </span>{" "}
                                                {getEventLocation(eventMember)}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-base-content">
                                                    Tarih:
                                                </span>{" "}
                                                {getEventDate(eventMember)}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-base-content">
                                                    Saat:
                                                </span>{" "}
                                                {getEventTime(eventMember)}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-base-content">
                                                    Ücret:
                                                </span>{" "}
                                                {getEventFee(eventMember)}
                                            </p>
                                        </div>
                                    }
                                    variant={isActive ? "sky" : "rose"}
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

export default StudentProfileDetails;