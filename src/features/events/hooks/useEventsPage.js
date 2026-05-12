import { useEffect, useMemo, useState } from "react";
import { eventService } from "../services/eventService";
import { teacherService } from "../../teachers/services/teacherService";
import { exportToPdf } from "../../../utils/exportToPdf";
import { emptyEventForm } from "../constants/eventConstants";
import { eventPdfColumns } from "../constants/eventTableColumns";
import {
    filterEvents,
    getBackendFieldErrors,
    getEventDescription,
    getEventEndTime,
    getEventId,
    getEventIsActive,
    getEventIsPaid,
    getEventLocation,
    getEventName,
    getEventPricePerStudent,
    getEventQuota,
    getEventResponsibleTeacherIds,
    getEventStartTime,
    getEventDate,
    getTeacherId,
    normalizeResponsibleTeacherIds,
} from "../utils/eventFormatters";

export function useEventsPage() {
    const [events, setEvents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState(emptyEventForm);
    const [errors, setErrors] = useState({});
    const [editingEventId, setEditingEventId] = useState(null);
    const [deletingEventId, setDeletingEventId] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const isEditing = editingEventId !== null;

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

    const getErrorMessage = (error, fallbackMessage) => {
        return (
            error?.response?.data?.message ||
            error?.response?.data?.Message ||
            error?.response?.data?.error ||
            error?.response?.data?.Error ||
            error?.response?.data?.title ||
            error?.message ||
            fallbackMessage
        );
    };

    const openModal = (id) => {
        document.getElementById(id)?.showModal();
    };

    const closeModal = (id) => {
        document.getElementById(id)?.close();
    };

    const normalizeResultData = (result) => {
        return result?.data || result?.Data || result || [];
    };

    const loadEvents = async () => {
        try {
            const result = await eventService.getAll();

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(
                    result.message ||
                    result.Message ||
                    "Etkinlikler yüklenirken hata oluştu.",
                    "error"
                );
                return;
            }

            const data = normalizeResultData(result);
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            showToast(
                getErrorMessage(error, "Etkinlikler yüklenirken hata oluştu."),
                "error"
            );
        }
    };

    const loadTeachers = async () => {
        try {
            const result = await teacherService.getAll();

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(
                    result.message ||
                    result.Message ||
                    "Öğretmenler yüklenirken hata oluştu.",
                    "error"
                );
                return;
            }

            const data = normalizeResultData(result);

            const activeTeachers = Array.isArray(data)
                ? data.filter((teacher) => {
                    const isActive = teacher?.isActive ?? teacher?.IsActive;
                    const teacherId = getTeacherId(teacher);

                    return isActive !== false && Boolean(teacherId);
                })
                : [];

            setTeachers(activeTeachers);
        } catch (error) {
            console.error(error);
            showToast(
                getErrorMessage(error, "Öğretmenler yüklenirken hata oluştu."),
                "error"
            );
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            await Promise.all([loadEvents(), loadTeachers()]);
        };

        loadInitialData();
    }, []);

    const filteredEvents = useMemo(() => {
        return filterEvents(events, teachers, search, statusFilter, paymentFilter);
    }, [events, teachers, search, statusFilter, paymentFilter]);

    const handleOpenCreateModal = (modalId) => {
        setEditingEventId(null);
        setFormData(emptyEventForm);
        setErrors({});
        openModal(modalId);
    };

    const handleOpenEditModal = (event, modalId) => {
        setEditingEventId(getEventId(event));
        setErrors({});

        setFormData({
            name: getEventName(event) === "-" ? "" : getEventName(event),
            description:
                getEventDescription(event) === "-" ? "" : getEventDescription(event),
            location: getEventLocation(event) === "-" ? "" : getEventLocation(event),
            eventDate: getEventDate(event) ? getEventDate(event).split("T")[0] : "",
            startTime: getEventStartTime(event),
            endTime: getEventEndTime(event),
            isPaid: String(getEventIsPaid(event)),
            pricePerStudent: getEventPricePerStudent(event),
            quota: getEventQuota(event),
            responsibleTeacherIds: normalizeResponsibleTeacherIds(
                getEventResponsibleTeacherIds(event)
            ),
            isActive: String(getEventIsActive(event)),
        });

        openModal(modalId);
    };

    const handleCloseEventModal = (modalId) => {
        setEditingEventId(null);
        setFormData(emptyEventForm);
        setErrors({});
        closeModal(modalId);
    };

    const handleOpenDeleteModal = (id, modalId) => {
        setDeletingEventId(id);
        openModal(modalId);
    };

    const handleCloseDeleteModal = (modalId) => {
        setDeletingEventId(null);
        closeModal(modalId);
    };

    const validateEventForm = () => {
        const newErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Etkinlik adı zorunludur.";
        }

        if (!formData.location?.trim()) {
            newErrors.location = "Etkinlik yeri zorunludur.";
        }

        if (!formData.eventDate) {
            newErrors.eventDate = "Etkinlik tarihi seçiniz.";
        }

        if (!formData.startTime) {
            newErrors.startTime = "Etkinlik saati seçiniz.";
        }

        const isPaid = formData.isPaid === true || formData.isPaid === "true";

        if (isPaid && Number(formData.pricePerStudent) <= 0) {
            newErrors.pricePerStudent =
                "Ücretli etkinlik için kişi başı ücret giriniz.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const prepareEventPayload = () => {
        const isPaid = formData.isPaid === true || formData.isPaid === "true";

        return {
            name: formData.name.trim(),
            description: formData.description?.trim() || null,
            location: formData.location.trim(),
            eventDate: formData.eventDate,
            startTime: formData.startTime,
            endTime: formData.endTime || null,
            isPaid,
            pricePerStudent: isPaid ? Number(formData.pricePerStudent || 0) : 0,
            quota: formData.quota ? Number(formData.quota) : null,
            responsibleTeacherIds: normalizeResponsibleTeacherIds(
                formData.responsibleTeacherIds
            ),
            isActive: isEditing
                ? formData.isActive === true || formData.isActive === "true"
                : true,
        };
    };

    const handleSubmit = async (modalId) => {
        if (!validateEventForm()) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        const preparedData = prepareEventPayload();

        try {
            const result = isEditing
                ? await eventService.update({
                    id: editingEventId,
                    ...preparedData,
                })
                : await eventService.create(preparedData);

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                const message = result.message || result.Message || "İşlem başarısız.";

                setErrors({
                    general: message,
                });

                showToast(message, "error");
                return;
            }

            await loadEvents();
            handleCloseEventModal(modalId);
            showToast(isEditing ? "Etkinlik güncellendi." : "Etkinlik eklendi.");
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
        if (!deletingEventId) return;

        try {
            const result = await eventService.delete(deletingEventId);

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(
                    result.message || result.Message || "Etkinlik silinemedi.",
                    "error"
                );
                return;
            }

            await loadEvents();
            handleCloseDeleteModal(modalId);
            showToast("Etkinlik silindi.");
        } catch (error) {
            console.error(error);
            showToast(
                getErrorMessage(error, "Etkinlik silinirken hata oluştu."),
                "error"
            );
        }
    };

    const handleExportEventsPdf = () => {
        exportToPdf({
            title: "Etkinlik Listesi",
            fileName: "etkinlik-listesi.pdf",
            columns: eventPdfColumns,
            data: events,
        });
    };

    return {
        events,
        filteredEvents,
        teachers,
        formData,
        setFormData,
        errors,
        isEditing,
        deletingEventId,
        toast,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        paymentFilter,
        setPaymentFilter,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseEventModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDelete,
        handleSubmit,
        handleExportEventsPdf,
    };
}