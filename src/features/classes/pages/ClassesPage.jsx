import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import ClassForm from "../components/ClassForm";
import ClassTable from "../components/ClassTable";
import { classService } from "../services/classService";
import { teacherService } from "../../teachers/services/teacherService";

const emptyClassForm = {
  grade: "",
  section: "",
  teacherId: "",
};

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyClassForm);
  const [editingClassId, setEditingClassId] = useState(null);
  const [deletingClassId, setDeletingClassId] = useState(null);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const isEditing = editingClassId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2500);
  };

  const loadClasses = async () => {
    try {
      const result = await classService.getAll();
      setClasses(result.data || []);
    } catch {
      showToast("Sınıflar yüklenirken hata oluştu.", "error");
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [classResult, teacherResult] = await Promise.all([
          classService.getAll(),
          teacherService.getAll(),
        ]);

        setClasses(classResult.data || []);
        setTeachers(teacherResult.data || []);
      } catch {
        setToast({
          message: "Veriler yüklenirken hata oluştu.",
          type: "error",
        });
      }
    };

    loadInitialData();
  }, []);

  const filteredClasses = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return classes.filter((classItem) => {
      const className = classItem.name || `${classItem.grade}-${classItem.section}`;

      const teacher = teachers.find((x) => x.id === classItem.teacherId);
      const teacherName =
        teacher?.fullName ||
        `${teacher?.firstName || ""} ${teacher?.lastName || ""}`.trim();

      const matchesSearch =
        className.toLowerCase().includes(normalizedSearch) ||
        teacherName.toLowerCase().includes(normalizedSearch);

      const matchesGrade =
        gradeFilter === "all" || String(classItem.grade) === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [classes, teachers, search, gradeFilter]);

  const handleOpenCreateModal = () => {
    setEditingClassId(null);
    setFormData(emptyClassForm);
    document.getElementById("class_modal").showModal();
  };

  const handleOpenEditModal = (classItem) => {
    setEditingClassId(classItem.id);

    setFormData({
      grade: String(classItem.grade || ""),
      section: classItem.section || "",
      teacherId: classItem.teacherId || "",
    });

    document.getElementById("class_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("class_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingClassId(id);
    document.getElementById("class_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("class_delete_modal").close();
  };

  const handleSubmit = async () => {
    if (!formData.grade || !formData.section.trim()) {
      showToast("Sınıf seviyesi ve şube alanı zorunludur.", "error");
      return;
    }

    const preparedData = {
      grade: Number(formData.grade),
      section: formData.section.trim().toUpperCase(),
      teacherId: formData.teacherId || null,
    };

    try {
      if (isEditing) {
        await classService.update({
          id: editingClassId,
          ...preparedData,
        });

        showToast("Sınıf güncellendi.");
      } else {
        await classService.create(preparedData);
        showToast("Sınıf eklendi.");
      }

      setFormData(emptyClassForm);
      setEditingClassId(null);
      handleCloseModal();
      loadClasses();
    } catch {
      showToast("İşlem sırasında hata oluştu.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await classService.delete(deletingClassId);

      setDeletingClassId(null);
      handleCloseDeleteModal();
      showToast("Sınıf silindi.");
      loadClasses();
    } catch {
      showToast("Sınıf silinirken hata oluştu.", "error");
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">Sınıf Yönetimi</p>

            <h1 className="mt-1 text-2xl font-semibold text-gray-950">
              Sınıflar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Sınıfları oluşturun ve öğretmen atayın
            </p>
          </div>

          <CreateButton icon={AcademicCapIcon} onClick={handleOpenCreateModal}>
            Yeni Sınıf
          </CreateButton>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sınıf veya öğretmen ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-52"
          >
            <option value="all">Tüm Sınıflar</option>
            <option value="9">9. Sınıflar</option>
            <option value="10">10. Sınıflar</option>
            <option value="11">11. Sınıflar</option>
            <option value="12">12. Sınıflar</option>
          </select>
        </div>

        <ClassTable
          classes={filteredClasses}
          teachers={teachers}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="class_modal"
        title={isEditing ? "Sınıf Düzenle" : "Yeni Sınıf"}
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit}>
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <ClassForm
          formData={formData}
          setFormData={setFormData}
          teachers={teachers}
        />
      </Modal>

      <ConfirmModal
        id="class_delete_modal"
        title="Sınıfı Sil"
        description="Bu işlem geri alınamaz."
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClassesPage;