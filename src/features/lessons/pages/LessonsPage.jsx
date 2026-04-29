import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import LessonForm from "../components/LessonForm";
import LessonTable from "../components/LessonTable";
import { lessonService } from "../services/lessonService";

const emptyLessonForm = {
  name: "",
};

function LessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState(emptyLessonForm);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [deletingLessonId, setDeletingLessonId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");

  const isEditing = editingLessonId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getLessons = async () => {
    try {
      const result = await lessonService.getAll();

      if (result.isSuccess) {
        setLessons(result.data || []);
      } else {
        showToast(result.message || "Dersler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      await getLessons();
    };

    fetchLessons();
  }, []);

  const filteredLessons = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return lessons.filter((lesson) =>
      lesson.name?.toLowerCase().includes(normalizedSearch)
    );
  }, [lessons, search]);

  const handleOpenCreateModal = () => {
    setEditingLessonId(null);
    setFormData(emptyLessonForm);
    document.getElementById("lesson_modal").showModal();
  };

  const handleOpenEditModal = (lesson) => {
    setEditingLessonId(lesson.id);

    setFormData({
      name: lesson.name || "",
    });

    document.getElementById("lesson_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("lesson_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingLessonId(id);
    document.getElementById("lesson_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("lesson_delete_modal").close();
  };

  const handleDelete = async () => {
    try {
      const result = await lessonService.delete(deletingLessonId);

      if (!result.isSuccess) {
        showToast(result.message || "Ders silinemedi.", "error");
        return;
      }

      await getLessons();
      setDeletingLessonId(null);
      handleCloseDeleteModal();
      showToast("Ders başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    const name = formData.name.trim();

    if (!name) {
      showToast("Lütfen ders adını girin.", "error");
      return;
    }

    const preparedLesson = {
      name,
    };

    try {
      const result = isEditing
        ? await lessonService.update({
          id: editingLessonId,
          ...preparedLesson,
          isActive: true,
        })
        : await lessonService.create(preparedLesson);

      if (!result.isSuccess) {
        showToast(result.message || "İşlem başarısız.", "error");
        return;
      }

      await getLessons();

      setFormData(emptyLessonForm);
      setEditingLessonId(null);
      handleCloseModal();

      showToast(
        isEditing
          ? "Ders başarıyla güncellendi."
          : "Yeni ders başarıyla eklendi."
      );
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Ders Yönetimi</p>
          <h1 className="text-2xl font-bold text-gray-900">Dersler</h1>
          <p className="mt-1 text-sm text-gray-500">
            Okulunuza ait ders kayıtlarını yönetin
          </p>
        </div>

        <CreateButton icon={BookOpenIcon} onClick={handleOpenCreateModal}>
          Yeni Ders
        </CreateButton>
      </div>

      <div className="relative">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ders ara..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      <LessonTable
        lessons={filteredLessons}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <Modal
        id="lesson_modal"
        title={isEditing ? "Ders Güncelle" : "Yeni Ders Ekle"}
        footer={
          <>
            <Button variant="ghost" onClick={handleCloseModal}>
              Vazgeç
            </Button>

            <Button onClick={handleSubmit}>
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <LessonForm formData={formData} setFormData={setFormData} />
      </Modal>

      <ConfirmModal
        id="lesson_delete_modal"
        title="Dersi Sil"
        message="Bu dersi silmek istediğinize emin misiniz?"
        confirmText="Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

export default LessonsPage;