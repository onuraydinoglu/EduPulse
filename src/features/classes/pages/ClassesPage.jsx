import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
import CreateButton from "../../../components/ui/CreateButton";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import ClassTable from "../components/ClassTable";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import ClassForm from "../components/ClassForm";

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

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
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
      showToast("Lütfen sınıf seviyesi, şube ve sınıf öğretmeni seçin.", "error");
      return;
    }

    const className = `${formData.grade}-${formData.branch}`;

    if (isEditing) {
      setClasses((prev) =>
        prev.map((classItem) =>
          classItem.id === editingClassId
            ? {
              ...classItem,
              ...formData,
              className,
            }
            : classItem
        )
      );

      showToast("Sınıf bilgileri başarıyla güncellendi.");
    } else {
      const newClass = {
        id: Date.now(),
        ...formData,
        className,
        studentCount: 0,
      };

      setClasses((prev) => [newClass, ...prev]);
      showToast("Yeni sınıf başarıyla eklendi.");
    }

    setFormData(emptyClassForm);
    setEditingClassId(null);
    handleCloseModal();
  };

  const handleDelete = () => {
    setClasses((prev) =>
      prev.filter((classItem) => classItem.id !== deletingClassId)
    );

    setDeletingClassId(null);
    handleCloseDeleteModal();
    showToast("Sınıf başarıyla silindi.");
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Sınıflar"
        description="Okulunuzdaki sınıfları oluşturun ve sınıf öğretmeni atayın"
      >
        <CreateButton onClick={handleOpenCreateModal}>
          Yeni Sınıf
        </CreateButton>
      </PageHeader>

      <PageToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Sınıf veya öğretmen ara..."
        filterValue={gradeFilter}
        onFilterChange={setGradeFilter}
        filterOptions={[
          { label: "Tüm Sınıflar", value: "all" },
          { label: "9. Sınıflar", value: "9" },
          { label: "10. Sınıflar", value: "10" },
          { label: "11. Sınıflar", value: "11" },
          { label: "12. Sınıflar", value: "12" },
        ]}
      />

      <ClassTable
        classes={filteredClasses}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <Modal
        id="class_modal"
        title={isEditing ? "Sınıf Bilgilerini Düzenle" : "Yeni Sınıf Ekle"}
        footer={
          <>
            <form method="dialog">
              <button className="btn btn-ghost rounded-xl">
                Vazgeç
              </button>
            </form>

            <button
              onClick={handleSubmit}
              className="btn btn-primary rounded-xl"
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </button>
          </>
        }
      >
        <ClassForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="class_delete_modal"
        title="Sınıfı Sil"
        description="Bu sınıf kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ClassesPage;