import {
    AcademicCapIcon,
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

    const studentNumber = getValue(profile, ["studentNumber", "StudentNumber"], "-");
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

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ProfileInfoCard icon={HashtagIcon} label="Öğrenci No" value={studentNumber} />
                <ProfileInfoCard icon={AcademicCapIcon} label="Sınıf" value={classroomName} />
                <ProfileInfoCard icon={ClipboardDocumentCheckIcon} label="Ders Sayısı" value={grades.length} />
                <ProfileInfoCard icon={ChartBarIcon} label="Genel Ortalama" value={generalAverage} />
            </div>

            <ProfileSection
                title="Kişisel Bilgiler"
                description="Öğrencinin sistemde kayıtlı temel bilgileri"
                icon={UserCircleIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard icon={UserCircleIcon} label="Ad Soyad" value={getFullName(profile)} />
                    <ProfileInfoCard icon={HashtagIcon} label="Öğrenci Numarası" value={studentNumber} />
                    <ProfileInfoCard icon={AcademicCapIcon} label="Sınıf" value={classroomName} />
                    <ProfileInfoCard icon={EnvelopeIcon} label="E-posta" value={getEmail(profile)} />
                    <ProfileInfoCard icon={PhoneIcon} label="Telefon" value={getPhoneNumber(profile)} />
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
                                            {getValue(exam, ["examName", "ExamName", "name", "Name"], "-")}
                                        </td>
                                        <td>
                                            {formatDate(
                                                getValue(exam, ["examDate", "ExamDate", "date", "Date"], "")
                                            )}
                                        </td>
                                        <td>{getValue(exam, ["correctCount", "CorrectCount", "correct", "Correct"], "-")}</td>
                                        <td>{getValue(exam, ["wrongCount", "WrongCount", "wrong", "Wrong"], "-")}</td>
                                        <td>{getValue(exam, ["emptyCount", "EmptyCount", "blank", "Blank"], "-")}</td>
                                        <td>
                                            <span className="badge badge-secondary rounded-xl px-3 py-3 font-bold">
                                                {getValue(exam, ["net", "Net"], "-")}
                                            </span>
                                        </td>
                                        <td>{getValue(exam, ["score", "Score", "point", "Point"], "-")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </ProfileSection>

            <ProfileSection
                title="Kulüp ve Etkinlik Katılımları"
                description="Öğrencinin kulüp ve etkinlik ilişkileri"
                icon={UserGroupIcon}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <ProfileInfoCard icon={UserGroupIcon} label="Kulüp Kaydı" value={clubMembers.length} />
                    <ProfileInfoCard icon={UserGroupIcon} label="Etkinlik Kaydı" value={eventMembers.length} />
                </div>
            </ProfileSection>
        </div>
    );
}

export default StudentProfileDetails;