import { useEffect, useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CreateButton from "../../../components/ui/CreateButton";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import { eventService } from "../services/eventService";

const emptyEventForm = {
  name: "",
  location: "",
  eventDate: "",
  StartTime: "",
  isPaid: false,
  pricePerStudent: "",
  responsibleTeacherIds: [],
  isActive: true,
};

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState(emptyEventForm);
  const [editingEventId, setEditingEventId] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);

  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const isEditing = editingEventId !== null;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  };

  const getResultData = (response) => {
    return response.data?.data ?? response.data?.Data ?? response.data;
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const data = await eventService.getAll();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(
        error.message || "Etkinlikler yüklenirken hata oluştu.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TEACHERS);
      const data = getResultData(response);

      setTeachers(Array.isArray(data) ? data : []);
    } catch {
      setTeachers([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
      await fetchTeachers();
    };

    loadData();
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return events.filter((event) => {
      const name = (event.name || event.Name || "").toLowerCase();
      const location = (event.location || event.Location || "").toLowerCase();
      const isPaid = event.isPaid ?? event.IsPaid ?? false;

      const teacherNames =
        event.responsibleTeacherNames ||
        event.ResponsibleTeacherNames ||
        event.teacherNames ||
        event.TeacherNames ||
        [];

      const teacherText = Array.isArray(teacherNames)
        ? teacherNames.join(" ").toLowerCase()
        : "";

      const matchesSearch =
        name.includes(normalizedSearch) ||
        location.includes(normalizedSearch) ||
        teacherText.includes(normalizedSearch);

      const matchesPayment =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && isPaid) ||
        (paymentFilter === "free" && !isPaid);

      return matchesSearch && matchesPayment;
    });
  }, [events, search, paymentFilter]);

  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setFormData(emptyEventForm);
    document.getElementById("event_modal").showModal();
  };

  const handleOpenEditModal = (event) => {
    const id = event.id || event.Id;

    setEditingEventId(id);

    setFormData({
      name: event.name || event.Name || "",
      location: event.location || event.Location || "",
      eventDate: (event.eventDate || event.EventDate || "").split("T")[0],
      startTime: event.startTime || event.EventTime || "",
      isPaid: event.isPaid ?? event.IsPaid ?? false,
      pricePerStudent: event.pricePerStudent ?? event.PricePerStudent ?? "",
      responsibleTeacherIds:
        event.responsibleTeacherIds || event.ResponsibleTeacherIds || [],
      isActive: event.isActive ?? event.IsActive ?? true,
    });

    document.getElementById("event_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("event_modal").close();
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingEventId(id);
    document.getElementById("event_delete_modal").showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("event_delete_modal").close();
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast("Etkinlik adı boş bırakılamaz.", "error");
      return false;
    }

    if (!formData.location.trim()) {
      showToast("Etkinlik yeri boş bırakılamaz.", "error");
      return false;
    }

    if (!formData.eventDate) {
      showToast("Etkinlik tarihi seçiniz.", "error");
      return false;
    }

    if (!formData.startTime) {
      showToast("Etkinlik saati seçiniz.", "error");
      return false;
    }

    if (formData.isPaid && Number(formData.pricePerStudent) <= 0) {
      showToast("Ücretli etkinlik için kişi başı ücret giriniz.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      if (isEditing) {
        await eventService.update({
          id: editingEventId,
          name: formData.name.trim(),
          location: formData.location.trim(),
          eventDate: formData.eventDate,
          startTime: formData.startTime,
          isPaid: formData.isPaid,
          pricePerStudent: formData.isPaid
            ? Number(formData.pricePerStudent)
            : 0,
          responsibleTeacherIds: formData.responsibleTeacherIds || [],
          isActive: formData.isActive,
        });

        showToast("Etkinlik başarıyla güncellendi.");
      } else {
        await eventService.create({
          name: formData.name.trim(),
          location: formData.location.trim(),
          eventDate: formData.eventDate,
          startTime: formData.startTime,
          isPaid: formData.isPaid,
          pricePerStudent: formData.isPaid
            ? Number(formData.pricePerStudent)
            : 0,
          responsibleTeacherIds: formData.responsibleTeacherIds || [],
        });

        showToast("Etkinlik başarıyla oluşturuldu.");
      }

      setFormData(emptyEventForm);
      setEditingEventId(null);
      handleCloseModal();
      fetchEvents();
    } catch (error) {
      showToast(
        error.message || "Etkinlik kaydedilirken hata oluştu.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await eventService.delete(deletingEventId);

      setDeletingEventId(null);
      handleCloseDeleteModal();
      showToast("Etkinlik başarıyla silindi.");
      fetchEvents();
    } catch (error) {
      showToast(
        error.message || "Etkinlik silinirken hata oluştu.",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="radius-card border border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Etkinlik Yönetimi
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
              Etkinlikler
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Okulunuza ait ücretsiz ve ücretli etkinlikleri yönetin
            </p>
          </div>

          <CreateButton icon={CalendarDaysIcon} onClick={handleOpenCreateModal}>
            Yeni Etkinlik
          </CreateButton>
        </div>
      </section>

      <section className="radius-card border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Etkinlik, yer veya öğretmen ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-52"
          >
            <option value="all">Tüm Etkinlikler</option>
            <option value="free">Ücretsiz</option>
            <option value="paid">Ücretli</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="radius-card border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Etkinlikler yükleniyor...
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="radius-card border border-dashed border-gray-300 bg-white p-10 text-center">
          <CalendarDaysIcon className="mx-auto h-10 w-10 text-gray-300" />

          <h3 className="mt-3 text-base font-semibold text-gray-800">
            Etkinlik bulunamadı
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Yeni etkinlik oluşturarak başlayabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id || event.Id}
              event={event}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      )}

      <Modal
        id="event_modal"
        title={
          isEditing ? "Etkinlik Bilgilerini Düzenle" : "Yeni Etkinlik Ekle"
        }
        footer={
          <>
            <form method="dialog">
              <Button variant="ghost">Vazgeç</Button>
            </form>

            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </>
        }
      >
        <EventForm
          formData={formData}
          setFormData={setFormData}
          teachers={teachers}
          isEditing={isEditing}
        />
      </Modal>

      <ConfirmModal
        id="event_delete_modal"
        title="Etkinliği Sil"
        description="Bu etkinlik kaydı kalıcı olarak silinecek. Devam etmek istediğinize emin misiniz?"
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default EventsPage;