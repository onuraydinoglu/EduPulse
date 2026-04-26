import { useMemo, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
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

  const students = [
    { id: 1, firstName: "Ali", lastName: "Yıldız", className: "9-A" },
    { id: 2, firstName: "Ayşe", lastName: "Kaya", className: "9-A" },
    { id: 3, firstName: "Mehmet", lastName: "Can", className: "9-A" },
    { id: 4, firstName: "Zeynep", lastName: "Kara", className: "9-A" },
    { id: 5, firstName: "Ece", lastName: "Arslan", className: "10-B" },
    { id: 6, firstName: "Kerem", lastName: "Aksoy", className: "10-B" },
    { id: 7, firstName: "Deniz", lastName: "Şahin", className: "10-B" },
  ];

  const [trialExams, setTrialExams] = useState([
    { id: 1, name: "TYT Deneme 1", className: teacherClass.className },
  ]);

  const [selectedTrialExamId, setSelectedTrialExamId] = useState(1);
  const [newTrialExamName, setNewTrialExamName] = useState("");

  const [results, setResults] = useState({
    1: {
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
    },
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const selectedTrialExam = trialExams.find(
    (exam) => exam.id === Number(selectedTrialExamId)
  );

  const selectedStudents = useMemo(() => {
    return students.filter(
      (student) => student.className === teacherClass.className
    );
  }, []);

  const currentResults = results[selectedTrialExamId] || {};

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleCreateTrialExam = () => {
    if (!newTrialExamName.trim()) {
      showToast("Lütfen deneme sınavı adı girin.", "error");
      return;
    }

    const newExam = {
      id: Date.now(),
      name: newTrialExamName.trim(),
      className: teacherClass.className,
    };

    setTrialExams((prev) => [newExam, ...prev]);
    setSelectedTrialExamId(newExam.id);
    setNewTrialExamName("");

    showToast("Yeni deneme sınavı oluşturuldu.");
  };

  const handleResultChange = (studentId, field, value) => {
    if (value && Number(value) < 0) {
      showToast("Net değeri negatif olamaz.", "error");
      return;
    }

    setResults((prev) => ({
      ...prev,
      [selectedTrialExamId]: {
        ...prev[selectedTrialExamId],
        [studentId]: {
          ...prev[selectedTrialExamId]?.[studentId],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    if (!selectedTrialExam) {
      showToast("Lütfen önce deneme sınavı seçin.", "error");
      return;
    }

    console.log("Deneme sınavı kaydı:", {
      trialExam: selectedTrialExam,
      className: teacherClass.className,
      results: currentResults,
    });

    showToast(`${selectedTrialExam.name} sonuçları kaydedildi.`);
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
              Önce deneme sınavı oluşturun, ardından kendi sınıfınıza ait
              netleri girin.
            </p>
          </div>

          <Button onClick={handleSave}>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
            Sonuçları Kaydet
          </Button>
        </div>
      </section>

      <section className="radius-card border border-gray-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Yeni Deneme Sınavı
            </label>

            <input
              type="text"
              value={newTrialExamName}
              onChange={(e) => setNewTrialExamName(e.target.value)}
              placeholder="Örn: TYT Deneme 2"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <Button onClick={handleCreateTrialExam}>
            <PlusIcon className="h-5 w-5" />
            Deneme Ekle
          </Button>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              Sonuç Girişi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Seçili deneme sınavına göre öğrenci netlerini girin.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <select
              value={selectedTrialExamId}
              onChange={(e) => setSelectedTrialExamId(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-64"
            >
              {trialExams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))}
            </select>

            <div className="inline-flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-600">
              {teacherClass.className} / {selectedStudents.length} Öğrenci
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-tight text-gray-950">
              {teacherClass.className} - {selectedTrialExam?.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Öğrencilerin ders bazlı netlerini girin.
            </p>
          </div>

          <TrialExamResultTable
            students={selectedStudents}
            results={currentResults}
            onResultChange={handleResultChange}
          />
        </div>
      </section>
    </div>
  );
}

export default TrialExamsPage;