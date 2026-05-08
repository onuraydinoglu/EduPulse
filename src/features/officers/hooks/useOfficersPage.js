import { useEffect, useMemo, useState } from "react";

import { officerService } from "../services/officerService";

import {
  hasValidationError,
  validateForm,
} from "../../../validations/validationRules";

import { userValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";
import { exportToPdf } from "../../../utils/exportToPdf";

import { emptyOfficerForm } from "../constants/officerConstants";
import { officerPdfColumns } from "../constants/officerTableColumns";

import {
  filterOfficers,
  getBackendFieldErrors,
  getErrorMessage,
  getOfficerEmail,
  getOfficerFirstName,
  getOfficerId,
  getOfficerIsActive,
  getOfficerLastName,
  getOfficerPhoneNumber,
  isOfficerUser,
} from "../utils/officerFormatters";

export function useOfficersPage() {
  const [officers, setOfficers] = useState([]);
  const [formData, setFormData] = useState(emptyOfficerForm);
  const [errors, setErrors] = useState({});
  const [editingOfficerId, setEditingOfficerId] = useState(null);
  const [deletingOfficerId, setDeletingOfficerId] = useState(null);
  const [temporaryPasswords, setTemporaryPasswords] = useState({});
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isEditing = editingOfficerId !== null;

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

  const getOfficers = async () => {
    try {
      const result = await officerService.getAll();

      if (result.isSuccess) {
        const onlyOfficers = (result.data || []).filter(isOfficerUser);
        setOfficers(onlyOfficers);
      } else {
        showToast(result.message || "Memurlar getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Sunucu hatası oluştu."), "error");
    }
  };

  useEffect(() => {
    const fetchOfficers = async () => {
      await getOfficers();
    };

    fetchOfficers();
  }, []);

  const filteredOfficers = useMemo(() => {
    return filterOfficers(officers, search, statusFilter);
  }, [officers, search, statusFilter]);

  const handleOpenCreateModal = (modalId) => {
    setEditingOfficerId(null);
    setFormData(emptyOfficerForm);
    setErrors({});
    openModal(modalId);
  };

  const handleOpenEditModal = (officer, modalId) => {
    setEditingOfficerId(getOfficerId(officer));
    setErrors({});

    setFormData({
      firstName: getOfficerFirstName(officer),
      lastName: getOfficerLastName(officer),
      email: getOfficerEmail(officer),
      phoneNumber: getOfficerPhoneNumber(officer),
      isActive: getOfficerIsActive(officer),
    });

    openModal(modalId);
  };

  const handleCloseOfficerModal = (modalId) => {
    setEditingOfficerId(null);
    setFormData(emptyOfficerForm);
    setErrors({});
    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setDeletingOfficerId(id);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingOfficerId(null);
    closeModal(modalId);
  };

  const prepareOfficerPayload = () => {
    return {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: cleanPhone(formData.phoneNumber),
      isActive: isEditing ? formData.isActive : true,
    };
  };

  const handleSubmit = async (modalId) => {
    const validationErrors = validateForm(formData, userValidationSchema);

    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedOfficer = prepareOfficerPayload();

    try {
      const result = isEditing
        ? await officerService.update({
            id: editingOfficerId,
            ...preparedOfficer,
          })
        : await officerService.create(preparedOfficer);

      if (!result.isSuccess) {
        const message = result.message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

        showToast(message, "error");
        return;
      }

      if (!isEditing) {
        const temporaryPassword = result.message?.split("Geçici şifre: ")[1];

        if (temporaryPassword) {
          setTemporaryPasswords((prev) => ({
            ...prev,
            [preparedOfficer.email]: temporaryPassword,
          }));
        }
      }

      await getOfficers();
      handleCloseOfficerModal(modalId);

      showToast(
        isEditing
          ? "Memur bilgileri başarıyla güncellendi."
          : "Yeni memur başarıyla eklendi.",
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
    if (!deletingOfficerId) return;

    try {
      const result = await officerService.delete(deletingOfficerId);

      if (!result.isSuccess) {
        showToast(result.message || "Memur silinemedi.", "error");
        return;
      }

      await getOfficers();
      handleCloseDeleteModal(modalId);
      showToast("Memur başarıyla silindi.");
    } catch (error) {
      console.error(error);

      showToast(getErrorMessage(error, "Memur silinirken hata oluştu."), "error");
    }
  };

  const handleExportOfficersPdf = () => {
    exportToPdf({
      title: "Memur Listesi",
      fileName: "memur-listesi.pdf",
      columns: officerPdfColumns,
      data: officers,
    });
  };

  return {
    officers,
    filteredOfficers,

    formData,
    setFormData,
    errors,
    isEditing,
    deletingOfficerId,
    temporaryPasswords,
    toast,

    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseOfficerModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportOfficersPdf,
  };
}