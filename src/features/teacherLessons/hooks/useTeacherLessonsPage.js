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
    getTeacherLessonClassroomIds,
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
    const [editingGroup, setEditingGroup] = useState(null);
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

    const groupedTeacherLessons = useMemo(() => {
        return getGroupedTeacherLessonItems(teacherLessons);
    }, [teacherLessons]);

    const filteredTeacherLessons = useMemo(() => {
        return filterTeacherLessons(groupedTeacherLessons, search, statusFilter);
    }, [groupedTeacherLessons, search, statusFilter]);

    const handleOpenCreateModal = async (modalId) => {
        await getSelectData();

        setEditingId(null);
        setEditingGroup(null);
        setFormData(emptyTeacherLessonForm);
        setErrors({});

        openModal(modalId);
    };

    const handleOpenEditModal = async (teacherLesson, modalId) => {
        await getSelectData();

        const teacherId = getTeacherLessonTeacherId(teacherLesson);
        const lessonId = getTeacherLessonLessonId(teacherLesson);

        const relatedTeacherLessons = Array.isArray(teacherLesson.items)
            ? teacherLesson.items
            : teacherLessons.filter(
                (item) =>
                    getTeacherLessonTeacherId(item) === teacherId &&
                    getTeacherLessonLessonId(item) === lessonId
            );

        const classroomIdsFromRelatedItems = relatedTeacherLessons
            .map((item) => getTeacherLessonClassroomId(item))
            .filter(Boolean);

        const fallbackClassroomIds = getTeacherLessonClassroomIds(teacherLesson);

        const selectedClassroomIds = [
            ...new Set(
                classroomIdsFromRelatedItems.length > 0
                    ? classroomIdsFromRelatedItems
                    : fallbackClassroomIds
            ),
        ];

        setEditingId(getTeacherLessonId(teacherLesson));
        setEditingGroup({
            teacherId,
            lessonId,
        });
        setErrors({});

        setFormData({
            id: getTeacherLessonId(teacherLesson),
            teacherId,
            lessonId,
            classroomId: selectedClassroomIds[0] || "",
            classroomIds: selectedClassroomIds,
            isActive: getTeacherLessonIsActive(teacherLesson),
        });

        openModal(modalId);
    };

    const prepareSinglePayload = ({ classroomId, isActive }) => ({
        teacherId: formData.teacherId,
        lessonId: formData.lessonId,
        classroomId,
        isActive: typeof isActive === "boolean" ? isActive : formData.isActive,
    });

    const handleCloseTeacherLessonModal = (modalId) => {
        setEditingId(null);
        setEditingGroup(null);
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
        const validationErrors = validateTeacherLessonForm(formData);

        setErrors(validationErrors);

        if (hasTeacherLessonValidationError(validationErrors)) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        try {
            const selectedClassroomIds = Array.isArray(formData.classroomIds)
                ? [...new Set(formData.classroomIds)]
                : [];

            if (isEditing) {
                const sourceTeacherId = editingGroup?.teacherId || formData.teacherId;
                const sourceLessonId = editingGroup?.lessonId || formData.lessonId;

                const relatedTeacherLessons = teacherLessons.filter(
                    (item) =>
                        getTeacherLessonTeacherId(item) === sourceTeacherId &&
                        getTeacherLessonLessonId(item) === sourceLessonId
                );

                const existingByClassroomId = new Map(
                    relatedTeacherLessons
                        .map((item) => [getTeacherLessonClassroomId(item), item])
                        .filter(([classroomId]) => Boolean(classroomId))
                );

                const updatePayloads = selectedClassroomIds
                    .filter((classroomId) => existingByClassroomId.has(classroomId))
                    .map((classroomId) => {
                        const existingItem = existingByClassroomId.get(classroomId);

                        return {
                            id: getTeacherLessonId(existingItem),
                            ...prepareSinglePayload({
                                classroomId,
                                isActive: formData.isActive,
                            }),
                        };
                    });

                const createPayloads = selectedClassroomIds
                    .filter((classroomId) => !existingByClassroomId.has(classroomId))
                    .map((classroomId) => ({
                        teacherId: formData.teacherId,
                        lessonId: formData.lessonId,
                        classroomIds: [classroomId],
                        isActive: formData.isActive,
                    }));

                const passivePayloads = relatedTeacherLessons
                    .filter(
                        (item) =>
                            !selectedClassroomIds.includes(getTeacherLessonClassroomId(item))
                    )
                    .map((item) => ({
                        id: getTeacherLessonId(item),
                        teacherId: formData.teacherId,
                        lessonId: formData.lessonId,
                        classroomId: getTeacherLessonClassroomId(item),
                        isActive: false,
                    }));

                const results = await Promise.all([
                    ...updatePayloads.map((payload) =>
                        teacherLessonService.update(payload)
                    ),
                    ...createPayloads.map((payload) =>
                        teacherLessonService.create(payload)
                    ),
                    ...passivePayloads.map((payload) =>
                        teacherLessonService.update(payload)
                    ),
                ]);

                const failedResult = results.find(
                    (result) => result?.isSuccess === false || result?.IsSuccess === false
                );

                if (failedResult) {
                    const message =
                        failedResult.message ||
                        failedResult.Message ||
                        "Bazı atamalar güncellenemedi.";

                    setErrors({
                        general: message,
                    });

                    showToast(message, "error");
                    return;
                }

                await getTeacherLessons();
                handleCloseTeacherLessonModal(modalId);
                showToast("Öğretmen ders atamaları başarıyla güncellendi.");
                return;
            }

            const payloads = selectedClassroomIds.map((classroomId) => ({
                teacherId: formData.teacherId,
                lessonId: formData.lessonId,
                classroomIds: [classroomId],
                isActive: true,
            }));

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
            rows: filteredTeacherLessons,
            emptyMessage: "Dışa aktarılacak öğretmen ders ataması bulunamadı.",
        });
    };

    return {
        teacherLessons: groupedTeacherLessons,
        filteredTeacherLessons,
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