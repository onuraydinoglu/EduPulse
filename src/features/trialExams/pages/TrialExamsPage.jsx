import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
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
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Deneme Sınavları"
        description="Öğretmen sadece kendi sınıfına ait deneme sınavı netlerini girer"
      >
        <Button onClick={handleSave}>Deneme Sonuçlarını Kaydet</Button>
      </PageHeader>

      <div className="mb-6 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
        <label className="label">
          <span className="label-text font-semibold">Deneme Sınavı Adı</span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full rounded-xl md:max-w-md"
          value={trialExamName}
          onChange={(e) => setTrialExamName(e.target.value)}
          placeholder="Örn: TYT Deneme 1"
        />
      </div>

      <div className="mt-6 card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="card-title">
                {selectedClass} - {trialExamName}
              </h2>
              <p className="text-sm text-base-content/50">
                Öğrencilerin ders bazlı netlerini girin.
              </p>
            </div>

            <div className="badge badge-primary rounded-lg p-4">
              {selectedStudents.length} Öğrenci
            </div>
          </div>

          <TrialExamResultTable
            students={selectedStudents}
            results={results}
            onResultChange={handleResultChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TrialExamsPage;