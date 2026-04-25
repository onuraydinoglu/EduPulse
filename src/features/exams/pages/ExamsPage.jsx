import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Button from "../../../components/ui/Button";
import Toast from "../../../components/ui/Toast";
import ExamClassCard from "../components/ExamClassCard";

function ExamsPage() {
  const teacherClasses = [
    { id: 1, className: "9-A", studentCount: 4 },
    { id: 2, className: "10-B", studentCount: 3 },
  ];

  const students = [
    { id: 1, firstName: "Ali", lastName: "Yıldız", className: "9-A", club: "Robotik" },
    { id: 2, firstName: "Ayşe", lastName: "Kaya", className: "9-A", club: "Müzik" },
    { id: 3, firstName: "Mehmet", lastName: "Can", className: "9-A", club: "Satranç" },
    { id: 4, firstName: "Zeynep", lastName: "Kara", className: "9-A", club: "" },
    { id: 5, firstName: "Ece", lastName: "Arslan", className: "10-B", club: "Tiyatro" },
  ];

  const [selectedClass, setSelectedClass] = useState("9-A");

  const [grades, setGrades] = useState({});

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const selectedStudents = useMemo(() => {
    return students.filter((s) => s.className === selectedClass);
  }, [selectedClass]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const handleChange = (studentId, field, value) => {
    if (value && (value < 0 || value > 100)) {
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
    console.log("KAYIT:", grades);
    showToast("Notlar kaydedildi");
  };

  const getValue = (id, field) => {
    return grades[id]?.[field] ?? "";
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Sınavlar"
        description="Sınıf bazlı öğrenci not giriş sistemi"
      >
        <Button onClick={handleSave}>Kaydet</Button>
      </PageHeader>

      {/* SINIF SEÇİMİ */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {teacherClasses.map((c) => (
          <ExamClassCard
            key={c.id}
            classItem={c}
            isSelected={selectedClass === c.className}
            onClick={setSelectedClass}
          />
        ))}
      </div>

      {/* TABLO */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200/70">
              <tr>
                <th>Öğrenci</th>
                <th>Sınıf</th>

                <th>1. Sınav</th>
                <th>2. Sınav</th>
                <th>Proje</th>

                <th>Sınıf İçi 1</th>
                <th>Sınıf İçi 2</th>
                <th>Sınıf İçi 3</th>
              </tr>
            </thead>

            <tbody>
              {selectedStudents.map((s) => (
                <tr key={s.id} className="hover:bg-base-200/60">
                  <td>
                    {s.firstName} {s.lastName}
                  </td>

                  <td>
                    <span className="badge badge-primary">{s.className}</span>
                  </td>

                  {/* NOT ALANLARI */}
                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "exam1")}
                      onChange={(e) =>
                        handleChange(s.id, "exam1", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "exam2")}
                      onChange={(e) =>
                        handleChange(s.id, "exam2", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "project")}
                      onChange={(e) =>
                        handleChange(s.id, "project", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "class1")}
                      onChange={(e) =>
                        handleChange(s.id, "class1", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "class2")}
                      onChange={(e) =>
                        handleChange(s.id, "class2", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-20"
                      value={getValue(s.id, "class3")}
                      onChange={(e) =>
                        handleChange(s.id, "class3", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedStudents.length === 0 && (
          <div className="p-6 text-center text-sm">
            Bu sınıfta öğrenci yok
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamsPage;