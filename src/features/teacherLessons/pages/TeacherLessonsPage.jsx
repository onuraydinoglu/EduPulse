import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";

import TeacherLessonForm from "../components/TeacherLessonForm";
import TeacherLessonTable from "../components/TeacherLessonTable";

import { teacherLessonService } from "../services/teacherLessonService";
import { teacherService } from "../../teachers/services/teacherService";
import { lessonService } from "../../lessons/services/lessonService";
import { classService } from "../../classes/services/classService";

const emptyForm = {
  id: "",
  teacherId: "",
  lessonId: "",
  classroomId: "",
  isActive: true,
};

function TeacherLessonsPage() {
  const [items, setItems] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const getListData = (result) => {
    if (result?.isSuccess) return result.data || [];
    if (Array.isArray(result)) return result;
    return result?.data || result?.Data || [];
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const fetchTeacherLessons = async () => {
    const result = await teacherLessonService.getAll();
    return getListData(result);
  };

  const refreshTeacherLessons = async () => {
    try {
      const data = await fetchTeacherLessons();
      setItems(data);
    } catch (error) {
      console.error(error);
      showToast("Atamalar yüklenirken hata oluştu.", "error");
    }
  };

  const getSelectData = async () => {
    try {
      const [teacherResult, lessonResult, classroomResult] = await Promise.all([
        teacherService.getAll(),
        lessonService.getAll(),
        classService.getAll(),
      ]);

      setTeachers(getListData(teacherResult));
      setLessons(getListData(lessonResult));
      setClassrooms(getListData(classroomResult));
    } catch (error) {
      console.error(error);
      showToast("Form verileri yüklenirken hata oluştu.", "error");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadTeacherLessons = async () => {
      try {
        const data = await fetchTeacherLessons();

        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          showToast("Atamalar yüklenirken hata oluştu.", "error");
        }
      }
    };

    loadTeacherLessons();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenEditModal = async (item) => {
    await getSelectData();

    setEditingId(item.id);

    setFormData({
      id: item.id,
      teacherId: item.teacherId,
      lessonId: item.lessonId,
      classroomId: item.classroomId,
      isActive: item.isActive ?? true,
    });

    openModal("teacher_lesson_modal");
  };

  const handleCloseModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    closeModal("teacher_lesson_modal");
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingId(id);
    openModal("teacher_lesson_delete_modal");
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await teacherLessonService.delete(deletingId);

      await refreshTeacherLessons();
      closeModal("teacher_lesson_delete_modal");
      setDeletingId(null);

      showToast("Atama başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast("Silme işlemi sırasında hata oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await teacherLessonService.update({
        id: editingId,
        teacherId: formData.teacherId,
        lessonId: formData.lessonId,
        classroomId: formData.classroomId,
        isActive: formData.isActive,
      });

      if (result && result.isSuccess === false) {
        showToast(result.message || "Güncelleme başarısız.", "error");
        return;
      }

      await refreshTeacherLessons();
      handleCloseModal();

      showToast("Atama başarıyla güncellendi.");
    } catch (error) {
      console.error(error);
      showToast("İşlem sırasında hata oluştu.", "error");
    }
  };

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return items.filter((item) => {
      return (
        (item.teacherFullName || "").toLowerCase().includes(normalizedSearch) ||
        (item.teacherName || "").toLowerCase().includes(normalizedSearch) ||
        (item.lessonName || "").toLowerCase().includes(normalizedSearch) ||
        (item.classroomName || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [items, search]);

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div>
          <p className="text-sm font-medium text-blue-600">Atama Yönetimi</p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-950">
            Öğretmen Ders Sınıf Atamaları
          </h1>
        </div>
      </section>

      <section className="radius-card border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Öğretmen, ders veya sınıf ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <TeacherLessonTable
          items={filteredItems}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="teacher_lesson_modal"
        title="Atamayı Düzenle"
        footer={
          <>
            <Button variant="ghost" onClick={handleCloseModal}>
              Vazgeç
            </Button>

            <Button onClick={handleSubmit}>Güncelle</Button>
          </>
        }
      >
        <TeacherLessonForm
          formData={formData}
          setFormData={setFormData}
          teachers={teachers}
          lessons={lessons}
          classrooms={classrooms}
          isEdit={true}
        />
      </Modal>

      <ConfirmModal
        id="teacher_lesson_delete_modal"
        title="Atamayı Sil"
        description="Bu kayıt silinecek. Emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TeacherLessonsPage;