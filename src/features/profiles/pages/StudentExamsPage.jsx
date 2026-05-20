import { useEffect, useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import EmptyProfileState from "../components/EmptyProfileState";
import ProfileSection from "../components/ProfileSection";
import { getValue } from "../utils/profileFormatters";
import { studentExamService } from "../services/studentExamService";

const StudentExamsPage = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadGrades = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await studentExamService.getMyGrades();
        setGrades(data);
      } catch (error) {
        console.error(error);
        setGrades([]);
        setErrorMessage(
          error?.message || "Not bilgileriniz yüklenirken bir hata oluştu.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadGrades();
  }, []);

  return (
    <div className="space-y-6">
      <ProfileSection
        title="Ders Notları"
        description="Ders bazlı sınav, proje, etkinlik ve ortalama bilgileriniz"
        icon={ClipboardDocumentCheckIcon}
      >
        {loading ? (
          <EmptyProfileState text="Notlar yükleniyor..." />
        ) : errorMessage ? (
          <EmptyProfileState text={errorMessage} />
        ) : grades.length === 0 ? (
          <EmptyProfileState text="Henüz not bilginiz bulunmuyor." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Ders</th>
                  <th className="px-4 py-3">1. Sınav</th>
                  <th className="px-4 py-3">2. Sınav</th>
                  <th className="px-4 py-3">Proje</th>
                  <th className="px-4 py-3">Etkinlik 1</th>
                  <th className="px-4 py-3">Etkinlik 2</th>
                  <th className="px-4 py-3">Etkinlik 3</th>
                  <th className="px-4 py-3">Ortalama</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {grades.map((grade, index) => (
                  <tr key={getValue(grade, ["id", "Id"], index)}>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {getValue(grade, ["lessonName", "LessonName"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["exam1", "Exam1"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["exam2", "Exam2"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["project", "Project"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["activity1", "Activity1"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["activity2", "Activity2"], "-")}
                    </td>

                    <td className="px-4 py-3 text-slate-700">
                      {getValue(grade, ["activity3", "Activity3"], "-")}
                    </td>

                    <td className="px-4 py-3">
                      <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
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
    </div>
  );
};

export default StudentExamsPage;
