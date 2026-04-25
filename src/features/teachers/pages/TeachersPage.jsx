import { useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import PageToolbar from "../../../components/common/PageToolbar";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";

const emptyTeacherForm = {
  firstName: "",
  lastName: "",
  age: "",
  branch: "",
  status: "Aktif",
};

const initialTeachers = [
  {
    id: 1,
    firstName: "Ayşe",
    lastName: "Demir",
    age: 35,
    branch: "Matematik",
    className: "9-A",
    school: "Müdürün Okulu",
    status: "Aktif",
  },
  {
    id: 2,
    firstName: "Murat",
    lastName: "Çelik",
    age: 41,
    branch: "Türk Dili ve Edebiyatı",
    className: "10-B",
    school: "Müdürün Okulu",
    status: "Aktif",
  },
  {
    id: 3,
    firstName: "Elif",
    lastName: "Şahin",
    age: 38,
    branch: "Fizik",
    className: "",
    school: "Müdürün Okulu",
    status: "Pasif",
  },
];

function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [formData, setFormData] = useState(emptyTeacherForm);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingTeacherId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        teacher.branch.toLowerCase().includes(search.toLowerCase()) ||
        teacher.className?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" || teacher.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [teachers, search, status]);

  const handleOpenCreateModal = () => {
    setEditingTeacherId(null);
    setFormData(emptyTeacherForm);
    document.getElementById("teacher_modal").showModal();
  };

  const handleOpenEditModal = (teacher) => {
    setEditingTeacherId(teacher.id);

    setFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      age: teacher.age,
      branch: teacher.branch,
      status: teacher.status,
    });

    document.getElementById("teacher_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("teacher_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingTeacherId(id);
    document.getElementById("teacher_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("teacher_delete_modal").close();
  };

  const handleDelete = () => {
    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== deletingTeacherId)
    );

    setDeletingTeacherId(null);
    handleCloseDeleteModal();
    showToast("Öğretmen başarıyla silindi.", "success");
  };

  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.age ||
      !formData.branch
    ) {
      showToast("Lütfen ad, soyad, yaş ve branş alanlarını doldurun.", "error");
      return;
    }

    if (Number(formData.age) <= 0) {
      showToast("Yaş 0'dan büyük olmalıdır.", "error");
      return;
    }

    if (isEditing) {
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === editingTeacherId
            ? {
              ...teacher,
              ...formData,
              age: Number(formData.age),
              school: teacher.school || "Müdürün Okulu",
            }
            : teacher
        )
      );

      showToast("Öğretmen bilgileri başarıyla güncellendi.", "success");
    } else {
      const newTeacher = {
        id: Date.now(),
        ...formData,
        age: Number(formData.age),
        school: "Müdürün Okulu",
        className: "",
      };

      setTeachers((prev) => [newTeacher, ...prev]);
      showToast("Yeni öğretmen başarıyla eklendi.", "success");
    }

    setFormData(emptyTeacherForm);
    setEditingTeacherId(null);
    handleCloseModal();
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} />

      <PageHeader
        title="Öğretmenler"
        description="Öğretmen kayıtlarını ve branş bilgilerini yönetin"
      >
        <CreateButton onClick={handleOpenCreateModal}>
          Yeni Öğretmen
        </CreateButton>
      </PageHeader>

      <PageToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Öğretmen, branş veya sınıf ara..."
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={[
          { label: "Tüm Durumlar", value: "all" },
          { label: "Aktif", value: "Aktif" },
          { label: "Pasif", value: "Pasif" },
        ]}
      />

      <TeacherTable
        teachers={filteredTeachers}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <Modal
        id="teacher_modal"
        title={
          isEditing ? "Öğretmen Bilgilerini Düzenle" : "Yeni Öğretmen Ekle"
        }
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
        <TeacherForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="teacher_delete_modal"
        title="Öğretmeni Sil"
        description="Bu öğretmen kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TeachersPage;