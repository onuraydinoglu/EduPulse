import { useEffect, useMemo, useState } from "react";

import { classService } from "../../classes/services/classService";
import { studentService } from "../services/studentService";

import {
  hasValidationError,
  validateForm,
} from "../../../validations/validationRules";

import { studentValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";
import { exportToPdf } from "../../../utils/exportToPdf";

import { emptyStudentForm } from "../constants/studentConstants";
import { studentPdfColumns } from "../constants/studentTableColumns";

import {
  filterStudents,
  getBackendFieldErrors,
  getErrorMessage,
  getStudentClassroomId,
  getStudentEmail,
  getStudentFirstName,
  getStudentId,
  getStudentLastName,
  getStudentNumber,
  getStudentPhoneNumber,
  mapClassroomsToOptions,
} from "../utils/studentFormatters";

export function useStudentsPage() {
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState(emptyStudentForm);
  const [errors, setErrors] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classroomFilter, setClassroomFilter] = useState("all");

  const isEditing = editingStudentId !== null;

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 2500);
  };

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const getStudents = async () => {
    try {
      const result = await studentService.getAll();

      if (result.isSuccess) {
        setStudents(result.data || []);
      } else {
        showToast(result.message || "Öğrenciler getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sunucu hatası oluştu."), "error");
    }
  };

  const getClassrooms = async () => {
    try {
      const result = await classService.getAll();

      if (result.isSuccess) {
        setClassrooms(result.data || []);
      } else {
        showToast(result.message || "Sınıflar getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sınıflar getirilemedi."), "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStudents();
      await getClassrooms();
    };

    fetchData();
  }, []);

  const filteredStudents = useMemo(() => {
    return filterStudents(students, search, statusFilter, classroomFilter);
  }, [students, search, statusFilter, classroomFilter]);

  const classroomOptions = useMemo(() => {
    return mapClassroomsToOptions(classrooms);
  }, [classrooms]);

  const handleOpenCreateModal = (modalId) => {
    setEditingStudentId(null);
    setFormData(emptyStudentForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (student, modalId) => {
    setEditingStudentId(getStudentId(student));
    setErrors({});

    setFormData({
      firstName: getStudentFirstName(student),
      lastName: getStudentLastName(student),
      email: getStudentEmail(student),
      phoneNumber: getStudentPhoneNumber(student),
      studentNumber: getStudentNumber(student),
      classroomId: getStudentClassroomId(student),
      motherFullName: student?.motherFullName || student?.MotherFullName || "",
      fatherFullName: student?.fatherFullName || student?.FatherFullName || "",
      motherPhoneNumber: student?.motherPhoneNumber || student?.MotherPhoneNumber || "",
      fatherPhoneNumber: student?.fatherPhoneNumber || student?.FatherPhoneNumber || "",
      address: student?.address || student?.Address || "",
    });

    openModal(modalId);
  };

  const handleCloseStudentModal = (modalId) => {
    setFormData(emptyStudentForm);
    setEditingStudentId(null);
    setErrors({});
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setDeletingStudentId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingStudentId(null);
    closeModal(modalId);
  };

  const prepareStudentPayload = () => {
    return {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: cleanPhone(formData.phoneNumber),
      studentNumber: formData.studentNumber.trim(),
      classroomId: formData.classroomId,
      motherFullName: formData.motherFullName.trim(),
      fatherFullName: formData.fatherFullName.trim(),
      motherPhoneNumber: cleanPhone(formData.motherPhoneNumber),
      fatherPhoneNumber: cleanPhone(formData.fatherPhoneNumber),
      address: formData.address.trim(),
      isActive: true,
    };
  };

  const handleSubmit = async (modalId) => {
    const validationErrors = validateForm(formData, studentValidationSchema);

    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedStudent = prepareStudentPayload();

    try {
      const result = isEditing
        ? await studentService.update({
          id: editingStudentId,
          ...preparedStudent,
        })
        : await studentService.create(preparedStudent);

      if (!result.isSuccess) {
        const message = result.message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

        showToast(message, "error");
        return;
      }

      await getStudents();
      handleCloseStudentModal(modalId);

      showToast(
        isEditing
          ? "Öğrenci bilgileri başarıyla güncellendi."
          : "Yeni öğrenci başarıyla eklendi.",
      );
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

  const handleDelete = async (modalId) => {
    if (!deletingStudentId) return;

    try {
      const result = await studentService.delete(deletingStudentId);

      if (result && result.isSuccess === false) {
        showToast(result.message || "Öğrenci silinemedi.", "error");
        return;
      }

      await getStudents();
      handleCloseDeleteModal(modalId);
      showToast("Öğrenci başarıyla silindi.");
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Öğrenci silinirken hata oluştu."),
        "error",
      );
    }
  };

  const handleExportStudentsPdf = () => {
    exportToPdf({
      title: "Öğrenci Listesi",
      fileName: "ogrenci-listesi.pdf",
      columns: studentPdfColumns,
      data: students,
    });
  };

  return {
    students,
    filteredStudents,
    classrooms,
    classroomOptions,

    formData,
    setFormData,
    errors,
    isEditing,
    deletingStudentId,

    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    classroomFilter,
    setClassroomFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseStudentModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportStudentsPdf,
  };
}