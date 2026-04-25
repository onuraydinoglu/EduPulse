import { useMemo, useState } from "react";
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

const emptyClassForm = {
  grade: "",
  branch: "",
  teacher: "",
};

const initialClasses = [
  {
    id: 1,
    className: "9-A",
    grade: "9",
    branch: "A",
    teacher: "Ayşe Demir",
    studentCount: 32,
  },
  {
    id: 2,
    className: "10-B",
    grade: "10",
    branch: "B",
    teacher: "Murat Çelik",
    studentCount: 28,
  },
];

function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses);
  const [formData, setFormData] = useState(emptyClassForm);
  const [editingClassId, setEditingClassId] = useState(null);
  const [deletingClassId, setDeletingClassId] = useState(null);

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const isEditing = editingClassId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2500);
  };

  const filteredClasses = useMemo(() => {
    return classes.filter((classItem) => {
      const matchesSearch =
        classItem.className.toLowerCase().includes(search.toLowerCase()) ||
        classItem.teacher.toLowerCase().includes(search.toLowerCase());

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
    setEditingClassId(classItem.id);
    setFormData({
      grade: classItem.grade,
      branch: classItem.branch,
      teacher: classItem.teacher,
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
    if (!formData.grade || !formData.branch || !formData.teacher) {
      showToast("Lütfen tüm alanları doldurun.", "error");
      return;
    }

    const className = `${formData.grade}-${formData.branch}`;

    if (isEditing) {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === editingClassId
            ? { ...item, ...formData, className }
            : item
        )
      );
      showToast("Sınıf güncellendi");
    } else {
      setClasses((prev) => [
        {
          id: Date.now(),
          ...formData,
          className,
          studentCount: 0,
        },
        ...prev,
      ]);
      showToast("Sınıf eklendi");
    }

    setFormData(emptyClassForm);
    setEditingClassId(null);
    handleCloseModal();
  };

  const handleDelete = () => {
    setClasses((prev) =>
      prev.filter((item) => item.id !== deletingClassId)
    );

    setDeletingClassId(null);
    handleCloseDeleteModal();
    showToast("Sınıf silindi");
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      {/* HEADER CARD */}
      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Sınıf Yönetimi
            </p>

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

      {/* TABLE CARD */}
      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:justify-between md:items-center">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sınıf veya öğretmen ara..."
              className="h-11 w-full rounded-xl border border-gray-200 pl-11 pr-4 text-sm focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="h-11 rounded-xl border border-gray-200 px-4 text-sm"
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

      {/* MODAL */}
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
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClassesPage;