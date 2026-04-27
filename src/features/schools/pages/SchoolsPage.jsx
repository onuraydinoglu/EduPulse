import { useEffect, useMemo, useState } from "react";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import SchoolForm from "../components/SchoolForm";
import CreateButton from "../../../components/ui/CreateButton";
import SchoolTable from "../components/SchoolTable";
import { schoolService } from "../services/schoolService";

const emptySchoolForm = {
  name: "",
  city: "",
  district: "",
  address: "",
  phoneNumber: "",
  email: "",
  principalName: "",
};

function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState(emptySchoolForm);
  const [formErrors, setFormErrors] = useState({});
  const [editingSchoolId, setEditingSchoolId] = useState(null);
  const [deletingSchoolId, setDeletingSchoolId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const isEditing = editingSchoolId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const validateSchoolForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Okul adı boş olamaz.";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Okul adı en fazla 100 karakter olabilir.";
    }

    if (!formData.city.trim()) {
      errors.city = "Şehir boş olamaz.";
    } else if (formData.city.trim().length > 50) {
      errors.city = "Şehir en fazla 50 karakter olabilir.";
    }

    if (!formData.district.trim()) {
      errors.district = "İlçe boş olamaz.";
    } else if (formData.district.trim().length > 50) {
      errors.district = "İlçe en fazla 50 karakter olabilir.";
    }

    if (!formData.address.trim()) {
      errors.address = "Adres boş olamaz.";
    } else if (formData.address.trim().length > 250) {
      errors.address = "Adres en fazla 250 karakter olabilir.";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Telefon numarası boş olamaz.";
    } else if (!/^0\d{10}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber =
        "Telefon numarası 0 ile başlamalı ve 11 haneli olmalıdır.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = "Geçerli bir email giriniz.";
    }

    if (formData.principalName.trim().length > 100) {
      errors.principalName = "Müdür adı en fazla 100 karakter olabilir.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const getSchools = async () => {
    try {
      const result = await schoolService.getAll();

      if (result.isSuccess) {
        setSchools(result.data);
      } else {
        showToast(result.message || "Okullar getirilemedi.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      await getSchools();
    };

    fetchSchools();
  }, []);

  const filteredSchools = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return schools.filter((school) => {
      const schoolName = school.name || "";
      const schoolCity = school.city || "";
      const principalName = school.principalName || "";

      const matchesSearch =
        schoolName.toLowerCase().includes(normalizedSearch) ||
        schoolCity.toLowerCase().includes(normalizedSearch) ||
        principalName.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        (status === "Aktif" && school.isActive === true) ||
        (status === "Pasif" && school.isActive === false);

      return matchesSearch && matchesStatus;
    });
  }, [schools, search, status]);

  const handleOpenCreateModal = () => {
    setEditingSchoolId(null);
    setFormData(emptySchoolForm);
    setFormErrors({});
    document.getElementById("school_modal").showModal();
  };

  const handleOpenEditModal = (school) => {
    setEditingSchoolId(school.id);
    setFormErrors({});

    setFormData({
      name: school.name || "",
      city: school.city || "",
      district: school.district || "",
      address: school.address || "",
      phoneNumber: school.phoneNumber || "",
      email: school.email || "",
      principalName: school.principalName || "",
    });

    document.getElementById("school_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("school_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingSchoolId(id);
    document.getElementById("school_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("school_delete_modal").close();
  };

  const handleDelete = async () => {
    try {
      const result = await schoolService.delete(deletingSchoolId);

      if (!result.isSuccess) {
        showToast(result.message || "Okul silinemedi.", "error");
        return;
      }

      await getSchools();

      setDeletingSchoolId(null);
      handleCloseDeleteModal();
      showToast("Okul başarıyla silindi.");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Sunucu hatası oluştu.", "error");
    }
  };

  const handleSubmit = async () => {
    if (!validateSchoolForm()) {
      showToast("Lütfen formdaki hataları düzeltin.", "error");
      return;
    }

    const preparedSchool = {
      name: formData.name.trim(),
      city: formData.city.trim(),
      district: formData.district.trim(),
      address: formData.address.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      principalName: formData.principalName.trim(),
    };

    try {
      const result = isEditing
        ? await schoolService.update({
          id: editingSchoolId,
          ...preparedSchool,
        })
        : await schoolService.create(preparedSchool);

      if (!result.isSuccess) {
        showToast(result.message || "İşlem başarısız.", "error");
        return;
      }

      await getSchools();

      setFormData(emptySchoolForm);
      setFormErrors({});
      setEditingSchoolId(null);
      handleCloseModal();

      showToast(
        isEditing
          ? "Okul bilgileri başarıyla güncellendi."
          : "Yeni okul başarıyla eklendi."
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
            <p className="text-sm font-medium text-blue-600">Okul Yönetimi</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Okullar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Sisteme kayıtlı okulları görüntüleyin ve yönetin
            </p>
          </div>

          <CreateButton
            icon={BuildingOffice2Icon}
            onClick={handleOpenCreateModal}
          >
            Yeni Okul
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
              placeholder="Okul, şehir veya müdür ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-52"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
        </div>

        <SchoolTable
          schools={filteredSchools}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      </section>

      <Modal
        id="school_modal"
        title={isEditing ? "Okul Bilgilerini Düzenle" : "Yeni Okul Ekle"}
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
        <SchoolForm
          formData={formData}
          setFormData={setFormData}
          errors={formErrors}
        />
      </Modal>

      <ConfirmModal
        id="school_delete_modal"
        title="Okulu Sil"
        description="Bu okul kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default SchoolsPage;