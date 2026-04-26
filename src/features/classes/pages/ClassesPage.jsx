import { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

import { mockApi } from "../../../services/mockApi";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import ClassForm from "../components/ClassForm";
import ClassTable from "../components/ClassTable";

const emptyClassForm = {
  grade: "",
  branch: "",
  teacher: "",
};

function ClassesPage() {
  const [classes, setClasses] = useState(() => mockApi.getClasses());
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

  const filteredClasses = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return classes.filter((classItem) => {
      const className = classItem.className || classItem.name || "";

      const matchesSearch =
        className.toLowerCase().includes(normalizedSearch) ||
        classItem.teacher?.toLowerCase().includes(normalizedSearch) ||
        classItem.school?.toLowerCase().includes(normalizedSearch);

      const matchesGrade =
        gradeFilter === "all" || classItem.grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [classes, search, gradeFilter]);

  const handleOpenCreateModal = () => {
    setEditingClassId(null);
    setFormData(emptyClassForm);
    document.getElementById("class_modal").showModal();
  };

  const handleOpenEditModal = (classItem) => {
    const className = classItem.className || classItem.name || "";
    const [, branch = ""] = className.split("-");

    setEditingClassId(classItem.id);

    setFormData({
      grade: classItem.grade || "",
      branch: classItem.branch || branch,
      teacher: classItem.teacher || "",
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

  const handleSubmit = () => {
    if (
      !formData.grade.trim() ||
      !formData.branch.trim() ||
      !formData.teacher.trim()
    ) {
      showToast("Lütfen tüm alanları doldurun.", "error");
      return;
    }

    const preparedClass = {
      grade: formData.grade.trim(),
      branch: formData.branch.trim().toUpperCase(),
      teacher: formData.teacher.trim(),
      className: `${formData.grade.trim()}-${formData.branch
        .trim()
        .toUpperCase()}`,
    };

    if (isEditing) {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === editingClassId
            ? {
              ...item,
              ...preparedClass,
            }
            : item
        )
      );

      showToast("Sınıf güncellendi.");
    } else {
      const newClass = {
        id: Date.now(),
        ...preparedClass,
        school: "Atatürk Anadolu Lisesi",
        studentCount: 0,
        average: 0,
      };

      setClasses((prev) => [newClass, ...prev]);
      showToast("Sınıf eklendi.");
    }

    setFormData(emptyClassForm);
    setEditingClassId(null);
    handleCloseModal();
  };

  const handleDelete = () => {
    setClasses((prev) => prev.filter((item) => item.id !== deletingClassId));

    setDeletingClassId(null);
    handleCloseDeleteModal();
    showToast("Sınıf silindi.");
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

          <CreateButton
            icon={AcademicCapIcon}
            onClick={handleOpenCreateModal}
          >
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
              placeholder="Sınıf, okul veya öğretmen ara..."
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
        <ClassForm formData={formData} setFormData={setFormData} />
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