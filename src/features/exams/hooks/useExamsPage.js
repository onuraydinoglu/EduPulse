import { useEffect, useMemo, useState } from "react";

import { classService } from "../../classes/services/classService";
import { lessonService } from "../../lessons/services/lessonService";
import { studentService } from "../../students/services/studentService";
import { exportToPdf } from "../../../utils/exportToPdf";
import { hasValidationError, validateForm } from "../../../validations/validationRules";

import { emptyExamForm } from "../constants/examConstants";
import { examPdfColumns } from "../constants/examTableColumns";
import { examService } from "../services/examService";

import {
    filterExams,
    getBackendFieldErrors,
    getErrorMessage,
    getExamActivity1,
    getExamActivity2,
    getExamActivity3,
    getExamId,
    getExamIsActive,
    getExamLessonId,
    getExamProject,
    getExamStudentId,
    getExam1,
    getExam2,
} from "../utils/examFormatters";

const gradeValidationSchema = {
    studentId: [(value) => (!value ? "Öğrenci seçilmelidir." : "")],
    lessonId: [(value) => (!value ? "Ders seçilmelidir." : "")],
    exam1: [(value) => validateGradeValue(value, "1. sınav")],
    exam2: [(value) => validateGradeValue(value, "2. sınav")],
    project: [(value) => validateGradeValue(value, "Proje")],
    activity1: [(value) => validateGradeValue(value, "Sınıf içi 1")],
    activity2: [(value) => validateGradeValue(value, "Sınıf içi 2")],
    activity3: [(value) => validateGradeValue(value, "Sınıf içi 3")],
};

function validateGradeValue(value, label) {
    if (value === "" || value === null || value === undefined) return "";

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
        return `${label} notu sayı olmalıdır.`;
    }

    if (numberValue < 0 || numberValue > 100) {
        return `${label} notu 0 ile 100 arasında olmalıdır.`;
    }

    return "";
}

export function useExamsPage() {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    const [formData, setFormData] = useState(emptyExamForm);
    const [errors, setErrors] = useState({});

    const [editingExamId, setEditingExamId] = useState(null);
    const [deletingExamId, setDeletingExamId] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [averageFilter, setAverageFilter] = useState("all");

    const isEditing = editingExamId !== null;

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
        return result?.data || result?.Data || [];
    };

    const getExams = async () => {
        try {
            const result = await examService.getAll();

            if (result.isSuccess || result.IsSuccess) {
                setExams(normalizeResultData(result));
            } else {
                showToast(result.message || result.Message || "Sınav notları getirilemedi.", "error");
            }
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Sınav notları getirilirken hata oluştu."), "error");
        }
    };

    const getLookupData = async () => {
        try {
            const [studentsResult, lessonsResult, classroomsResult] = await Promise.all([
                studentService.getAll(),
                lessonService.getAll(),
                classService.getAll(),
            ]);

            if (studentsResult.isSuccess || studentsResult.IsSuccess) {
                setStudents(normalizeResultData(studentsResult));
            }

            if (lessonsResult.isSuccess || lessonsResult.IsSuccess) {
                setLessons(normalizeResultData(lessonsResult));
            }

            if (classroomsResult.isSuccess || classroomsResult.IsSuccess) {
                setClassrooms(normalizeResultData(classroomsResult));
            }
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Liste verileri getirilirken hata oluştu."), "error");
        }
    };

    useEffect(() => {
        const fetchPageData = async () => {
            await Promise.all([getExams(), getLookupData()]);
        };

        fetchPageData();
    }, []);

    const filteredExams = useMemo(() => {
        return filterExams(exams, search, statusFilter, averageFilter);
    }, [exams, search, statusFilter, averageFilter]);

    const handleOpenCreateModal = (modalId) => {
        setEditingExamId(null);
        setFormData(emptyExamForm);
        setErrors({});
        openModal(modalId);
    };

    const handleOpenEditModal = (exam, modalId) => {
        setEditingExamId(getExamId(exam));
        setErrors({});

        setFormData({
            studentId: getExamStudentId(exam),
            lessonId: getExamLessonId(exam),
            exam1: getExam1(exam),
            exam2: getExam2(exam),
            project: getExamProject(exam),
            activity1: getExamActivity1(exam),
            activity2: getExamActivity2(exam),
            activity3: getExamActivity3(exam),
            isActive: getExamIsActive(exam),
        });

        openModal(modalId);
    };

    const handleCloseExamModal = (modalId) => {
        setEditingExamId(null);
        setFormData(emptyExamForm);
        setErrors({});
        closeModal(modalId);
    };

    const handleOpenDeleteModal = (id, modalId) => {
        setDeletingExamId(id);
        openModal(modalId);
    };

    const handleCloseDeleteModal = (modalId) => {
        setDeletingExamId(null);
        closeModal(modalId);
    };

    const normalizeGradeValue = (value) => {
        if (value === "" || value === null || value === undefined) return null;
        return Number(value);
    };

    const prepareExamPayload = () => {
        return {
            studentId: formData.studentId,
            lessonId: formData.lessonId,
            exam1: normalizeGradeValue(formData.exam1),
            exam2: normalizeGradeValue(formData.exam2),
            project: normalizeGradeValue(formData.project),
            activity1: normalizeGradeValue(formData.activity1),
            activity2: normalizeGradeValue(formData.activity2),
            activity3: normalizeGradeValue(formData.activity3),
            isActive: isEditing ? formData.isActive : true,
        };
    };

    const handleSubmit = async (modalId) => {
        const validationErrors = validateForm(formData, gradeValidationSchema);
        setErrors(validationErrors);

        if (hasValidationError(validationErrors)) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        const preparedExam = prepareExamPayload();

        try {
            const result = isEditing
                ? await examService.update({
                    id: editingExamId,
                    ...preparedExam,
                })
                : await examService.create(preparedExam);

            if (!result.isSuccess && !result.IsSuccess) {
                const message = result.message || result.Message || "İşlem başarısız.";
                setErrors({
                    general: message,
                });
                showToast(message, "error");
                return;
            }

            await getExams();
            handleCloseExamModal(modalId);

            showToast(
                isEditing
                    ? "Sınav notu başarıyla güncellendi."
                    : "Yeni sınav notu başarıyla eklendi.",
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
        if (!deletingExamId) return;

        try {
            const result = await examService.delete(deletingExamId);

            if (!result.isSuccess && !result.IsSuccess) {
                showToast(result.message || result.Message || "Sınav notu silinemedi.", "error");
                return;
            }

            await getExams();
            handleCloseDeleteModal(modalId);
            showToast("Sınav notu başarıyla silindi.");
        } catch (error) {
            console.error(error);
            showToast(getErrorMessage(error, "Sınav notu silinirken hata oluştu."), "error");
        }
    };

    const handleExportExamsPdf = () => {
        exportToPdf({
            title: "Sınav Notları Listesi",
            fileName: "sinav-notlari-listesi.pdf",
            columns: examPdfColumns,
            data: exams,
        });
    };

    return {
        exams,
        filteredExams,
        students,
        lessons,
        classrooms,
        formData,
        setFormData,
        errors,
        isEditing,
        deletingExamId,
        toast,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        averageFilter,
        setAverageFilter,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleCloseExamModal,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDelete,
        handleSubmit,
        handleExportExamsPdf,
    };
}