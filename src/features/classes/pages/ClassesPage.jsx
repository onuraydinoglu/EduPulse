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

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";

import { classroomValidationSchema } from "../../../validations/schemas";

const emptyClassForm = {
  grade: "",
  section: "",
  teacherId: "",
};

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(emptyClassForm);
  const [errors, setErrors] = useState({});
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

  const getErrorMessage = (error, fallback) => {
    const data = error?.response?.data;

    if (typeof data === "string") return data;

    return (
      data?.message ||
      data?.Message ||
      data?.error ||
      data?.Error ||
      data?.title ||
      data?.errors?.[0] ||
      data?.Errors?.[0] ||
      error?.message ||
      fallback
    );
  };

  const getBackendFieldErrors = (error) => {
    const data = error?.response?.data;
    const backendErrors = data?.errors || data?.Errors;

    if (!backendErrors || Array.isArray(backendErrors)) return {};

    const fieldErrors = {};

    Object.entries(backendErrors).forEach(([key, value]) => {
      const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
      fieldErrors[fieldName] = Array.isArray(value) ? value[0] : value;
    });

    return fieldErrors;
  };

  const loadClasses = async () => {
    try {
      const result = await classService.getAll();

      if (result?.isSuccess === false) {
        showToast(result.message || "Sınıflar yüklenirken hata oluştu.", "error");
        return;
      }

      setClasses(result.data || []);
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sınıflar yüklenirken hata oluştu."), "error");
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
      } catch (error) {
        console.error(error);
        showToast(getErrorMessage(error, "Veriler yüklenirken hata oluştu."), "error");
      }
    };

    loadInitialData();
  }, []);

  const filteredClasses = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return classes.filter((classItem) => {
      const className =
        classItem.name || `${classItem.grade}-${classItem.section}`;

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
    setErrors({});
    document.getElementById("class_modal").showModal();
  };

  const handleOpenEditModal = (classItem) => {
    setEditingClassId(classItem.id);
    setErrors({});

    setFormData({
      grade: String(classItem.grade || ""),
      section: classItem.section || "",
      teacherId: classItem.teacherId || "",
    });

    document.getElementById("class_modal").showModal();
  };

  const handleCloseModal = () => {
    setFormData(emptyClassForm);
    setEditingClassId(null);
    setErrors({});
    document.getElementById("class_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingClassId(id);
    document.getElementById("class_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    setDeletingClassId(null);
    document.getElementById("class_delete_modal").close();
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, classroomValidationSchema);
    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedData = {
      grade: Number(formData.grade),
      section: formData.section.trim().toUpperCase(),
      teacherId: formData.teacherId || null,
    };

    try {
      const result = isEditing
        ? await classService.update({
          id: editingClassId,
          ...preparedData,
        })
        : await classService.create(preparedData);

      if (result?.isSuccess === false) {
        const message = result.message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

        showToast(message, "error");
        return;
      }

      await loadClasses();
      handleCloseModal();

      showToast(isEditing ? "Sınıf güncellendi." : "Sınıf eklendi.");
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(error, "İşlem sırasında hata oluştu.");
      const backendFieldErrors = getBackendFieldErrors(error);

      setErrors({
        ...backendFieldErrors,
        general: message,
      });

      showToast(message, "error");
    }
  };

  const handleDelete = async () => {
    if (!deletingClassId) return;

    try {
      const result = await classService.delete(deletingClassId);

      if (result?.isSuccess === false) {
        showToast(result.message || "Sınıf silinemedi.", "error");
        return;
      }

      await loadClasses();

      handleCloseDeleteModal();
      showToast("Sınıf silindi.");
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sınıf silinirken hata oluştu."), "error");
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
            <Button variant="ghost" onClick={handleCloseModal}>
              Vazgeç
            </Button>

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
          errors={errors}
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