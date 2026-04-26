import { useMemo, useState } from "react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

import { mockApi } from "../../../services/mockApi";
import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import StudentGradeTable from "../components/StudentGradeTable";

function ExamsPage() {
  const teacherClasses = useMemo(() => mockApi.getClasses(), []);
  const students = useMemo(() => mockApi.getStudents(), []);

  const [selectedClass, setSelectedClass] = useState(
    teacherClasses[0]?.className || ""
  );

  const [grades, setGrades] = useState({});
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const selectedStudents = useMemo(() => {
    return students.filter((student) => student.className === selectedClass);
  }, [students, selectedClass]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleChange = (studentId, field, value) => {
    if (value && (Number(value) < 0 || Number(value) > 100)) {
      showToast("Not 0-100 arasında olmalı", "error");
      return;
    }

    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("KAYIT:", {
      selectedClass,
      grades,
    });

    showToast(`${selectedClass} sınıfı notları kaydedildi.`);
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">Not Yönetimi</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Sınavlar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Sınıf bazlı öğrenci not giriş sistemini yönetin
            </p>
          </div>

          <Button onClick={handleSave}>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
            Kaydet
          </Button>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Not Girişi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sınıf seçip öğrenci notlarını girin
            </p>
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-60"
          >
            {teacherClasses.map((classItem) => (
              <option key={classItem.id} value={classItem.className}>
                {classItem.className} ({classItem.studentCount} öğrenci)
              </option>
            ))}
          </select>
        </div>

        <StudentGradeTable
          students={selectedStudents}
          grades={grades}
          onGradeChange={handleChange}
        />
      </section>
    </div>
  );
}

export default ExamsPage;