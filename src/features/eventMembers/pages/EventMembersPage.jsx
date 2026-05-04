import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import Modal from "../../../components/ui/Modal";
import Toast from "../../../components/ui/Toast";
import CreateButton from "../../../components/ui/CreateButton";
import EventMemberForm from "../components/EventMemberForm";
import EventMemberTable from "../components/EventMemberTable";
import { eventMemberService } from "../services/eventMemberService";

const emptyForm = {
  eventId: "",
  studentId: "",
  isPaid: false,
  paidAmount: 0,
};

function EventMembersPage() {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventMembers, setSelectedEventMembers] = useState([]);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  const [loading, setLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 2500);
  }, []);

  useEffect(() => {
    const getResultData = (response) => {
      return response.data?.data ?? response.data?.Data ?? response.data;
    };

    const loadData = async () => {
      try {
        setLoading(true);

        const [eventResponse, studentResponse] = await Promise.all([
          axiosInstance.get(API_ENDPOINTS.EVENTS),
          axiosInstance.get(API_ENDPOINTS.STUDENTS),
        ]);

        const eventData = getResultData(eventResponse);
        const studentData = getResultData(studentResponse);

        setEvents(Array.isArray(eventData) ? eventData : []);
        setStudents(Array.isArray(studentData) ? studentData : []);
      } catch (error) {
        setEvents([]);
        setStudents([]);

        showToast(
          error.message || "Etkinlikler ve öğrenciler yüklenirken hata oluştu.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refreshKey, showToast]);

  useEffect(() => {
    const eventId = selectedEvent?.id || selectedEvent?.Id;

    if (!eventId) return;

    const loadSelectedEventMembers = async () => {
      try {
        setMemberLoading(true);

        const data = await eventMemberService.getByEventId(eventId);

        setSelectedEventMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        setSelectedEventMembers([]);

        showToast(
          error.message || "Etkinlik katılımcıları yüklenirken hata oluştu.",
          "error",
        );
      } finally {
        setMemberLoading(false);
      }
    };

    loadSelectedEventMembers();
  }, [selectedEvent, refreshKey, showToast]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return events.filter((event) => {
      const eventId = event.id || event.Id;

      const eventName = (
        event.name ||
        event.Name ||
        event.title ||
        event.Title ||
        ""
      ).toLowerCase();

      const location = (event.location || event.Location || "").toLowerCase();

      const matchesEventFilter = !selectedEventId || eventId === selectedEventId;

      const matchesSearch =
        !normalizedSearch ||
        eventName.includes(normalizedSearch) ||
        location.includes(normalizedSearch);

      return matchesEventFilter && matchesSearch;
    });
  }, [events, search, selectedEventId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventId) {
      newErrors.eventId = "Etkinlik seçiniz.";
    }

    if (!formData.studentId) {
      newErrors.studentId = "Öğrenci seçiniz.";
    }

    if (Number(formData.paidAmount) < 0) {
      newErrors.paidAmount = "Ödenen tutar 0'dan küçük olamaz.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreateModal = () => {
    setFormData(emptyForm);
    setErrors({});
    document.getElementById("event_member_modal")?.showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("event_member_modal")?.close();
    setFormData(emptyForm);
    setErrors({});
  };

  const handleOpenMembersModal = (event) => {
    setSelectedEvent(event);
    setSelectedEventMembers([]);
    document.getElementById("event_members_detail_modal")?.showModal();
  };

  const handleCloseMembersModal = () => {
    document.getElementById("event_members_detail_modal")?.close();
    setSelectedEvent(null);
    setSelectedEventMembers([]);
  };

  const handleOpenDeleteModal = (id) => {
    setDeletingId(id);
    document.getElementById("event_member_delete_modal")?.showModal();
  };

  const handleCloseDeleteModal = () => {
    document.getElementById("event_member_delete_modal")?.close();
    setDeletingId(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      await eventMemberService.create({
        eventId: formData.eventId,
        studentId: formData.studentId,
        isPaid: formData.isPaid,
        paidAmount: Number(formData.paidAmount || 0),
      });

      showToast("Öğrenci etkinliğe başarıyla eklendi.");

      handleCloseModal();

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showToast(
        error.message || "Öğrenci etkinliğe eklenirken hata oluştu.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await eventMemberService.delete(deletingId);

      showToast("Öğrenci etkinlikten çıkarıldı.");

      handleCloseDeleteModal();

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showToast(
        error.message || "Etkinlik katılımcısı silinirken hata oluştu.",
        "error",
      );
    }
  };

  const selectedEventName =
    selectedEvent?.name ||
    selectedEvent?.Name ||
    selectedEvent?.title ||
    selectedEvent?.Title ||
    "Etkinlik";

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type} />}

      <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Etkinlik Katılımcıları
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              Etkinlik Öğrencileri
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Etkinliklere öğrenci kaydı yapın ve katılımcı listelerini yönetin
            </p>
          </div>

          <CreateButton
            text="Yeni Etkinlik Katılımcısı"
            icon={UserPlusIcon}
            onClick={handleOpenCreateModal}
          />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Etkinlik veya konum ara..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 md:w-64"
          >
            <option value="">Tüm Etkinlikler</option>

            {events.map((event) => {
              const id = event.id || event.Id;
              const name =
                event.name ||
                event.Name ||
                event.title ||
                event.Title ||
                "-";

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center text-sm text-gray-500">
          Etkinlikler yükleniyor...
        </div>
      ) : (
        <EventMemberTable
          events={filteredEvents}
          onDetail={handleOpenMembersModal}
        />
      )}

      <Modal
        id="event_member_modal"
        title="Yeni Etkinlik Katılımcısı"
        description="Seçilen etkinliğe öğrenci kaydı yapın."
      >
        <EventMemberForm
          formData={formData}
          setFormData={setFormData}
          events={events}
          students={students}
          errors={errors}
        />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={handleCloseModal}>
            Vazgeç
          </Button>

          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </Modal>

      <Modal
        id="event_members_detail_modal"
        title={`${selectedEventName} Katılımcıları`}
        description="Etkinliğe kayıtlı öğrenciler"
      >
        {memberLoading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Katılımcılar yükleniyor...
          </div>
        ) : selectedEventMembers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-base-300 p-8 text-center text-sm text-gray-500">
            Bu etkinlikte henüz öğrenci yok.
          </div>
        ) : (
          <div className="space-y-3">
            {selectedEventMembers.map((member) => {
              const id = member.id || member.Id;

              const fullName =
                member.studentFullName ||
                member.StudentFullName ||
                member.fullName ||
                member.FullName ||
                "-";

              const number =
                member.studentNumber ||
                member.StudentNumber ||
                member.number ||
                member.Number ||
                "-";

              const classroomName =
                member.classroomName || member.ClassroomName || "-";

              const isPaid = member.isPaid ?? member.IsPaid ?? false;
              const paidAmount = member.paidAmount ?? member.PaidAmount ?? 0;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-100 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{fullName}</p>

                    <p className="text-sm text-gray-500">
                      Öğrenci No: {number}
                    </p>

                    <p className="text-sm text-gray-500">
                      Sınıf: {classroomName}
                    </p>

                    <p className="mt-1 text-xs font-medium text-gray-500">
                      {isPaid
                        ? `Ödeme: ${paidAmount} ₺`
                        : "Ödeme yapılmadı"}
                    </p>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(id)}
                    disabled={!id}
                  >
                    Sil
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={handleCloseMembersModal}>
            Kapat
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        id="event_member_delete_modal"
        title="Etkinlik katılımcısını sil"
        description="Bu öğrenciyi etkinlikten çıkarmak istediğinize emin misiniz?"
        confirmText="Sil"
        cancelText="Vazgeç"
        onConfirm={handleDelete}
        onCancel={handleCloseDeleteModal}
      />
    </div>
  );
}

export default EventMembersPage;