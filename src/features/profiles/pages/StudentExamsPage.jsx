import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Toast from "../../../components/ui/Toast";
import { authStorage } from "../../auth/services/authStorage";
import EmptyProfileState from "../components/EmptyProfileState";
import ProfileSection from "../components/ProfileSection";
import { useProfilePage } from "../hooks/useProfilePage";
import { getValue } from "../utils/profileFormatters";

const getCurrentStudentId = (user) => {
  return (
    user?.studentId ||
    user?.StudentId ||
    user?.id ||
    user?.Id ||
    user?.userId ||
    user?.UserId ||
    user?.student?.id ||
    user?.student?.Id ||
    user?.data?.studentId ||
    user?.data?.StudentId ||
    user?.data?.id ||
    user?.data?.Id ||
    ""
  );
};

const StudentExamsPage = () => {
  const user = authStorage.getUser();
  const studentId = getCurrentStudentId(user);

  const { details, loading, toast } = useProfilePage("student", studentId);

  const grades = details?.grades || [];

  if (!studentId) {
    return (
      <div className="space-y-6">
        {toast && <Toast type={toast.type} message={toast.message} />}

        <ProfileSection
          title="Ders Notları"
          description="Ders bazlı sınav, proje, etkinlik ve ortalama bilgileriniz"
          icon={ClipboardDocumentCheckIcon}
        >
          <EmptyProfileState text="Öğrenci bilgisi bulunamadı." />
        </ProfileSection>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {toast && <Toast type={toast.type} message={toast.message} />}

        <ProfileSection
          title="Ders Notları"
          description="Ders bazlı sınav, proje, etkinlik ve ortalama bilgileriniz"
          icon={ClipboardDocumentCheckIcon}
        >
          <EmptyProfileState text="Notlar yükleniyor..." />
        </ProfileSection>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} message={toast.message} />}

      <ProfileSection
        title="Ders Notları"
        description="Ders bazlı sınav, proje, etkinlik ve ortalama bilgileriniz"
        icon={ClipboardDocumentCheckIcon}
      >
        {grades.length === 0 ? (
          <EmptyProfileState text="Henüz not bilgisi bulunmuyor." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Ders</th>
                  <th className="px-4 py-3 font-semibold">1. Sınav</th>
                  <th className="px-4 py-3 font-semibold">2. Sınav</th>
                  <th className="px-4 py-3 font-semibold">Proje</th>
                  <th className="px-4 py-3 font-semibold">Etkinlik 1</th>
                  <th className="px-4 py-3 font-semibold">Etkinlik 2</th>
                  <th className="px-4 py-3 font-semibold">Etkinlik 3</th>
                  <th className="px-4 py-3 font-semibold">Ortalama</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800 text-slate-200">
                {grades.map((grade) => (
                  <tr key={grade.id || grade.Id}>
                    <td className="px-4 py-3 font-medium">
                      {getValue(grade.lessonName || grade.LessonName)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.exam1 || grade.Exam1)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.exam2 || grade.Exam2)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.project || grade.Project)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.activity1 || grade.Activity1)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.activity2 || grade.Activity2)}
                    </td>
                    <td className="px-4 py-3">
                      {getValue(grade.activity3 || grade.Activity3)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-300">
                      {getValue(grade.average || grade.Average)}
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
