import { useMemo, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import TrialExamResultTable from "../components/TrialExamResultTable";

function TrialExamsPage() {
  const teacherClass = {
    id: 1,
    className: "9-A",
    studentCount: 4,
  };

  const selectedClass = teacherClass.className;

  const students = [
    { id: 1, firstName: "Ali", lastName: "Yıldız", className: "9-A" },
    { id: 2, firstName: "Ayşe", lastName: "Kaya", className: "9-A" },
    { id: 3, firstName: "Mehmet", lastName: "Can", className: "9-A" },
    { id: 4, firstName: "Zeynep", lastName: "Kara", className: "9-A" },
    { id: 5, firstName: "Ece", lastName: "Arslan", className: "10-B" },
    { id: 6, firstName: "Kerem", lastName: "Aksoy", className: "10-B" },
    { id: 7, firstName: "Deniz", lastName: "Şahin", className: "10-B" },
  ];

  const [trialExamName, setTrialExamName] = useState("TYT Deneme 1");

  const [results, setResults] = useState({
    1: {
      turkish: "25",
      math: "18",
      science: "12",
      social: "14",
      english: "8",
    },
    2: {
      turkish: "20",
      math: "15",
      science: "10",
      social: "11",
      english: "7",
    },
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const selectedStudents = useMemo(() => {
    return students.filter((student) => student.className === selectedClass);
  }, [selectedClass]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleResultChange = (studentId, field, value) => {
    if (value && Number(value) < 0) {
      showToast("Net değeri negatif olamaz.", "error");
      return;
    }

    setResults((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Deneme sınavı kaydı:", {
      trialExamName,
      selectedClass,
      results,
    });

    showToast(`${selectedClass} sınıfı deneme sonuçları kaydedildi.`);
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Deneme Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Deneme Sınavları
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kendi sınıfınıza ait deneme sınavı netlerini girin
            </p>
          </div>

          <Button onClick={handleSave}>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
            Sonuçları Kaydet
          </Button>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={trialExamName}
              onChange={(e) => setTrialExamName(e.target.value)}
              placeholder="Örn: TYT Deneme 1"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="inline-flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-600">
            {selectedClass} / {selectedStudents.length} Öğrenci
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              {selectedClass} - {trialExamName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Öğrencilerin ders bazlı netlerini girin.
            </p>
          </div>

          <TrialExamResultTable
            students={selectedStudents}
            results={results}
            onResultChange={handleResultChange}
          />
        </div>
      </section>
    </div>
  );
}

export default TrialExamsPage;