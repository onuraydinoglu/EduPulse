import { useEffect, useMemo, useState } from "react";

import { classService } from "../../classes/services/classService";
import { lessonService } from "../../lessons/services/lessonService";
import { teacherService } from "../../teachers/services/teacherService";
import { teacherLessonService } from "../services/teacherLessonService";

import { exportToPdf } from "../../../utils/exportToPdf";
import { emptyTeacherLessonForm } from "../constants/teacherLessonConstants";
import { teacherLessonPdfColumns } from "../constants/teacherLessonTableColumns";

import {
    filterTeacherLessons,
    getBackendFieldErrors,
    getErrorMessage,
    getGroupedTeacherLessonItems,
    getListData,
    getTeacherLessonClassroomId,
    getTeacherLessonId,
    getTeacherLessonIsActive,
    getTeacherLessonLessonId,
    getTeacherLessonTeacherId,
    hasTeacherLessonValidationError,
    validateTeacherLessonForm,
} from "../utils/teacherLessonFormatters";

export function useTeacherLessonsPage() {
    const [teacherLessons, setTeacherLessons] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [formData, setFormData] = useState(emptyTeacherLessonForm);
    const [errors, setErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const isEditing = editingId !== null;

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

    const openModal = (modalId) => {
        document.getElementById(modalId)?.showModal();
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId)?.close();
    };

    const getTeacherLessons = async () => {
        try {
            const result = await teacherLessonService.getAll();
            setTeacherLessons(getListData(result));
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Öğretmen ders atamaları yüklenirken hata oluştu."
                ),
                "error"
            );
        }
    };

    const getSelectData = async () => {
        try {
            const [teacherResult, lessonResult, classroomResult] = await Promise.all([
                teacherService.getAll(),
                lessonService.getAll(),
                classService.getAll(),
            ]);

            setTeachers(getListData(teacherResult));
            setLessons(getListData(lessonResult));
            setClassrooms(getListData(classroomResult));
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(error, "Form verileri yüklenirken hata oluştu."),
                "error"
            );
        }
    };

    useEffect(() => {
        getTeacherLessons();
    }, []);

    const filteredTeacherLessons = useMemo(() => {
        return filterTeacherLessons(teacherLessons, search, statusFilter);
    }, [teacherLessons, search, statusFilter]);

    const groupedFilteredTeacherLessons = useMemo(() => {
        return getGroupedTeacherLessonItems(filteredTeacherLessons);
    }, [filteredTeacherLessons]);

    const handleOpenCreateModal = async (modalId) => {
        await getSelectData();

        setEditingId(null);
        setFormData(emptyTeacherLessonForm);
        setErrors({});

        openModal(modalId);
    };

    const handleOpenEditModal = async (teacherLesson, modalId) => {
        await getSelectData();

        setEditingId(getTeacherLessonId(teacherLesson));
        setErrors({});

        setFormData({
            id: getTeacherLessonId(teacherLesson),
            teacherId: getTeacherLessonTeacherId(teacherLesson),
            lessonId: getTeacherLessonLessonId(teacherLesson),
            classroomId: getTeacherLessonClassroomId(teacherLesson),
            classroomIds: [],
            isActive: getTeacherLessonIsActive(teacherLesson),
        });

        openModal(modalId);
    };

    const prepareSinglePayload = ({ classroomId }) => ({
        teacherId: formData.teacherId,
        lessonId: formData.lessonId,
        classroomId,
        isActive: isEditing ? formData.isActive : true,
    });

    const handleCloseTeacherLessonModal = (modalId) => {
        setEditingId(null);
        setFormData(emptyTeacherLessonForm);
        setErrors({});

        closeModal(modalId);
    };

    const handleOpenDeleteModal = (id, modalId) => {
        setDeletingId(id);
        openModal(modalId);
    };

    const handleCloseDeleteModal = (modalId) => {
        setDeletingId(null);
        closeModal(modalId);
    };

    const handleSubmit = async (modalId) => {
        const validationErrors = validateTeacherLessonForm(formData, isEditing);

        setErrors(validationErrors);

        if (hasTeacherLessonValidationError(validationErrors)) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        try {
            if (isEditing) {
                const result = await teacherLessonService.update({
                    id: editingId,
                    ...prepareSinglePayload({
                        classroomId: formData.classroomId,
                    }),
                });

                if (result?.isSuccess === false || result?.IsSuccess === false) {
                    const message = result.message || result.Message || "İşlem başarısız.";

                    setErrors({
                        general: message,
                    });

                    showToast(message, "error");
                    return;
                }

                await getTeacherLessons();
                handleCloseTeacherLessonModal(modalId);
                showToast("Öğretmen ders ataması başarıyla güncellendi.");

                return;
            }

            const payloads = formData.classroomIds.map((classroomId) =>
                prepareSinglePayload({
                    classroomId,
                })
            );

            const results = await Promise.all(
                payloads.map((payload) => teacherLessonService.create(payload))
            );

            const failedResult = results.find(
                (result) => result?.isSuccess === false || result?.IsSuccess === false
            );

            if (failedResult) {
                const message =
                    failedResult.message ||
                    failedResult.Message ||
                    "Bazı atamalar oluşturulamadı.";

                setErrors({
                    general: message,
                });

                showToast(message, "error");
                return;
            }

            await getTeacherLessons();
            handleCloseTeacherLessonModal(modalId);
            showToast("Öğretmen ders atamaları başarıyla oluşturuldu.");
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
        if (!deletingId) return;

        try {
            const result = await teacherLessonService.delete(deletingId);

            if (result?.isSuccess === false || result?.IsSuccess === false) {
                showToast(
                    result.message ||
                    result.Message ||
                    "Öğretmen ders ataması silinemedi.",
                    "error"
                );

                return;
            }

            await getTeacherLessons();
            handleCloseDeleteModal(modalId);
            showToast("Öğretmen ders ataması başarıyla silindi.");
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(
                    error,
                    "Öğretmen ders ataması silinirken hata oluştu."
                ),
                "error"
            );
        }
    };

    const handleExportTeacherLessonsPdf = () => {
        exportToPdf({
            title: "Öğretmen Ders Atamaları",
            fileName: "ogretmen-ders-atamalari.pdf",
            columns: teacherLessonPdfColumns,
            rows: groupedFilteredTeacherLessons,
            emptyMessage: "Dışa aktarılacak öğretmen ders ataması bulunamadı.",
        });
    };

    return {
        teacherLessons,
        filteredTeacherLessons: groupedFilteredTeacherLessons,
        teachers,
        lessons,
        classrooms,
        formData,
        setFormData,
        errors,
        isEditing,
        toast,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseTeacherLessonModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDelete,
        handleSubmit,
        handleExportTeacherLessonsPdf,
    };
}