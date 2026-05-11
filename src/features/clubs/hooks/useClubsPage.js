import { useEffect, useMemo, useState } from "react";
import { clubService } from "../services/clubService";
import { teacherService } from "../../teachers/services/teacherService";
import { exportToPdf } from "../../../utils/exportToPdf";

import { emptyClubForm } from "../constants/clubConstants";
import { clubPdfColumns } from "../constants/clubTableColumns";

import {
    filterClubs,
    getBackendFieldErrors,
    getClubAdvisorTeacherId,
    getClubId,
    getClubIsActive,
    getClubName,
    getErrorMessage,
} from "../utils/clubFormatters";

export function useClubsPage() {
    const [clubs, setClubs] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [formData, setFormData] = useState(emptyClubForm);
    const [errors, setErrors] = useState({});

    const [editingClubId, setEditingClubId] = useState(null);
    const [deletingClubId, setDeletingClubId] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const isEditing = editingClubId !== null;

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

    const normalizeResultData = (result) => {
        return result?.data || result?.Data || result || [];
    };

    const loadClubs = async () => {
        try {
            const result = await clubService.getAll();

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(result.message || result.Message || "Kulüpler yüklenirken hata oluştu.", "error");
                return;
            }

            const data = normalizeResultData(result);
            setClubs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Kulüpler yüklenirken hata oluştu."), "error");
        }
    };

    const loadTeachers = async () => {
        try {
            const result = await teacherService.getAll();

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(
                    result.message || result.Message || "Öğretmenler yüklenirken hata oluştu.",
                    "error",
                );
                return;
            }

            const data = normalizeResultData(result);

            const activeTeachers = Array.isArray(data)
                ? data.filter((teacher) => {
                    return teacher.isActive !== false && teacher.IsActive !== false;
                })
                : [];

            setTeachers(activeTeachers);
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Öğretmenler yüklenirken hata oluştu."), "error");
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            await Promise.all([loadClubs(), loadTeachers()]);
        };

        loadInitialData();
    }, []);

    const filteredClubs = useMemo(() => {
        return filterClubs(clubs, teachers, search, statusFilter);
    }, [clubs, teachers, search, statusFilter]);

    const handleOpenCreateModal = (modalId) => {
        setEditingClubId(null);
        setFormData(emptyClubForm);
        setErrors({});
        openModal(modalId);
    };

    const handleOpenEditModal = (club, modalId) => {
        setEditingClubId(getClubId(club));
        setErrors({});

        setFormData({
            name: getClubName(club) === "-" ? "" : getClubName(club),
            advisorTeacherId: getClubAdvisorTeacherId(club),
            isActive: String(getClubIsActive(club)),
        });

        openModal(modalId);
    };

    const handleCloseClubModal = (modalId) => {
        setEditingClubId(null);
        setFormData(emptyClubForm);
        setErrors({});
        closeModal(modalId);
    };

    const handleOpenDeleteModal = (id, modalId) => {
        setDeletingClubId(id);
        openModal(modalId);
    };

    const handleCloseDeleteModal = (modalId) => {
        setDeletingClubId(null);
        closeModal(modalId);
    };

    const validateClubForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Kulüp adı zorunludur.";
        }

        if (!formData.advisorTeacherId) {
            newErrors.advisorTeacherId = "Sorumlu öğretmen seçiniz.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const prepareClubPayload = () => {
        return {
            name: formData.name.trim(),
            advisorTeacherId: formData.advisorTeacherId,
            isActive: isEditing
                ? formData.isActive === true || formData.isActive === "true"
                : true,
        };
    };

    const handleSubmit = async (modalId) => {
        if (!validateClubForm()) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        const preparedData = prepareClubPayload();

        try {
            const result = isEditing
                ? await clubService.update({
                    id: editingClubId,
                    ...preparedData,
                })
                : await clubService.create(preparedData);

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                const message = result.message || result.Message || "İşlem başarısız.";

                setErrors({
                    general: message,
                });

                showToast(message, "error");
                return;
            }

            await loadClubs();
            handleCloseClubModal(modalId);
            showToast(isEditing ? "Kulüp güncellendi." : "Kulüp eklendi.");
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
        if (!deletingClubId) return;

        try {
            const result = await clubService.delete(deletingClubId);

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(result.message || result.Message || "Kulüp silinemedi.", "error");
                return;
            }

            await loadClubs();
            handleCloseDeleteModal(modalId);
            showToast("Kulüp silindi.");
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Kulüp silinirken hata oluştu."), "error");
        }
    };

    const handleExportClubsPdf = () => {
        exportToPdf({
            title: "Kulüp Listesi",
            fileName: "kulup-listesi.pdf",
            columns: clubPdfColumns,
            data: clubs,
        });
    };

    return {
        clubs,
        filteredClubs,
        teachers,

        formData,
        setFormData,
        errors,

        isEditing,
        deletingClubId,

        toast,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseClubModal,

        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDelete,

        handleSubmit,
        handleExportClubsPdf,
    };
}