import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";

import OfficerForm from "../components/OfficerForm";
import OfficerTable from "../components/OfficerTable";
import { officerService } from "../services/officerService";

import {
  validateForm,
  hasValidationError,
} from "../../../validations/validationRules";

import { userValidationSchema } from "../../../validations/schemas";
import { cleanPhone } from "../../../utils/phoneFormatter";

const emptyOfficerForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  isActive: true,
};

function OfficersPage() {
  const [officers, setOfficers] = useState([]);
  const [formData, setFormData] = useState(emptyOfficerForm);
  const [errors, setErrors] = useState({});
  const [editingOfficerId, setEditingOfficerId] = useState(null);
  const [deletingOfficerId, setDeletingOfficerId] = useState(null);
  const [temporaryPasswords, setTemporaryPasswords] = useState({});
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");

  const isEditing = editingOfficerId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
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

  const getOfficers = async () => {
    try {
      const result = await officerService.getAll();

      if (result.isSuccess) {
        const onlyOfficers = (result.data || []).filter(
          (user) => (user.roleName || "").toLowerCase() === "officer"
        );

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
    const normalizedSearch = search.toLowerCase().trim();

    return officers.filter((officer) => {
      const fullName = `${officer.firstName || ""} ${officer.lastName || ""
        }`.trim();

      return (
        fullName.toLowerCase().includes(normalizedSearch) ||
        officer.phoneNumber?.toLowerCase().includes(normalizedSearch) ||
        officer.email?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [officers, search]);

  const handleOpenCreateModal = () => {
    setEditingOfficerId(null);
    setFormData(emptyOfficerForm);
    setErrors({});
    document.getElementById("officer_modal").showModal();
  };

  const handleOpenEditModal = (officer) => {
    setEditingOfficerId(officer.id);
    setErrors({});

    setFormData({
      firstName: officer.firstName || "",
      lastName: officer.lastName || "",
      phoneNumber: officer.phoneNumber || "",
      email: officer.email || "",
      isActive: officer.isActive !== false,
    });

    document.getElementById("officer_modal").showModal();
  };

  const handleCloseModal = () => {
    setFormData(emptyOfficerForm);
    setEditingOfficerId(null);
    setErrors({});
    document.getElementById("officer_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingOfficerId(id);
    document.getElementById("officer_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    setDeletingOfficerId(null);
    document.getElementById("officer_delete_modal").close();
  };

  const handleDelete = async () => {
    if (!deletingOfficerId) return;

    try {
      const result = await officerService.delete(deletingOfficerId);

      if (!result.isSuccess) {
        showToast(result.message || "Memur silinemedi.", "error");
        return;
      }

      await getOfficers();

      handleCloseDeleteModal();
      showToast("Memur başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Memur silinirken hata oluştu."), "error");
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, userValidationSchema);
    setErrors(validationErrors);

    if (hasValidationError(validationErrors)) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    const preparedOfficer = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: cleanPhone(formData.phoneNumber),
      email: formData.email.trim(),
      isActive: isEditing ? formData.isActive : true,
    };

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

      handleCloseModal();

      showToast(
        isEditing
          ? "Memur bilgileri başarıyla güncellendi."
          : "Yeni memur başarıyla eklendi."
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

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Memur Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Memurlar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Memur kayıtlarını yönetin
            </p>
          </div>

          <CreateButton icon={UserPlusIcon} onClick={handleOpenCreateModal}>
            Yeni Memur
          </CreateButton>
        </div>
      </section>

      <section className="radius-card overflow-hidden border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Memur, telefon veya email ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <OfficerTable
          officers={filteredOfficers}
          temporaryPasswords={temporaryPasswords}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="officer_modal"
        title={isEditing ? "Memur Bilgilerini Düzenle" : "Yeni Memur Ekle"}
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
        <OfficerForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isEditing={isEditing}
        />
      </Modal>

      <ConfirmModal
        id="officer_delete_modal"
        title="Memuru Sil"
        description="Bu memur kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default OfficersPage;