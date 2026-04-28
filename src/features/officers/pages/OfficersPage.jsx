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

const emptyOfficerForm = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
};

function OfficersPage() {
  const [officers, setOfficers] = useState([]);
  const [formData, setFormData] = useState(emptyOfficerForm);
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
      showToast(error.message || "Sunucu hatası oluştu.", "error");
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
    document.getElementById("officer_modal").showModal();
  };

  const handleOpenEditModal = (officer) => {
    setEditingOfficerId(officer.id);

    setFormData({
      firstName: officer.firstName || "",
      lastName: officer.lastName || "",
      phoneNumber: officer.phoneNumber || "",
      email: officer.email || "",
    });

    document.getElementById("officer_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("officer_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingOfficerId(id);
    document.getElementById("officer_delete_modal").showModal();
  };

  const handleDelete = async () => {
    try {
      const result = await officerService.delete(deletingOfficerId);

      if (!result.isSuccess) {
        showToast(result.message || "Memur silinemedi.", "error");
        return;
      }

      await getOfficers();

      setDeletingOfficerId(null);
      document.getElementById("officer_delete_modal").close();

      showToast("Memur başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const email = formData.email.trim();

    if (!firstName || !lastName || !phoneNumber || !email) {
      showToast("Lütfen ad, soyad, telefon ve email alanlarını doldurun.", "error");
      return;
    }

    const preparedOfficer = {
      firstName,
      lastName,
      phoneNumber,
      email,
    };

    try {
      const result = isEditing
        ? await officerService.update({
          id: editingOfficerId,
          ...preparedOfficer,
          isActive: true,
        })
        : await officerService.create(preparedOfficer);

      if (!result.isSuccess) {
        showToast(result.message || "İşlem başarısız.", "error");
        return;
      }

      if (!isEditing) {
        const temporaryPassword = result.message?.split("Geçici şifre: ")[1];

        if (temporaryPassword) {
          setTemporaryPasswords((prev) => ({
            ...prev,
            [email]: temporaryPassword,
          }));
        }
      }

      await getOfficers();

      setFormData(emptyOfficerForm);
      setEditingOfficerId(null);
      handleCloseModal();

      showToast(
        isEditing
          ? "Memur bilgileri başarıyla güncellendi."
          : "Yeni memur başarıyla eklendi."
      );
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
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
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit}>
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <OfficerForm
          formData={formData}
          setFormData={setFormData}
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