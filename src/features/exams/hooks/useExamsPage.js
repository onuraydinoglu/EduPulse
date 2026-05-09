import { useEffect, useMemo, useState } from "react";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { lessonService } from "../../lessons/services/lessonService";
import { classService } from "../../classes/services/classService";
import { exportToPdf } from "../../../utils/exportToPdf";

import { examGradeFields } from "../constants/examConstants";
import { examPdfColumns } from "../constants/examTableColumns";
import { examService } from "../services/examService";

import {
    buildExamRows,
    createClassroomOptions,
    createLessonOptions,
    filterExamRows,
    getErrorMessage,
    normalizeGradeForPayload,
    normalizeGradeInput,
    normalizeResultData,
} from "../utils/examFormatters";

export function useExamsPage() {
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    const [selectedLessonId, setSelectedLessonId] = useState("");
    const [classroomFilter, setClassroomFilter] = useState("all");
    const [search, setSearch] = useState("");

    const [editedGrades, setEditedGrades] = useState({});
    const [savingRows, setSavingRows] = useState({});
    const [rowErrors, setRowErrors] = useState({});

    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

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

    const getStudents = async () => {
        const response = await axiosInstance.get(API_ENDPOINTS.STUDENTS);
        return response.data;
    };

    const getPageData = async () => {
        try {
            const [studentsResult, examsResult, lessonsResult, classroomsResult] =
                await Promise.all([
                    getStudents(),
                    examService.getAll(),
                    lessonService.getAll(),
                    classService.getAll(),
                ]);

            setStudents(normalizeResultData(studentsResult));
            setExams(normalizeResultData(examsResult));
            setLessons(normalizeResultData(lessonsResult));
            setClassrooms(normalizeResultData(classroomsResult));
        } catch (error) {
            console.error(error);
            showToast(
                getErrorMessage(error, "Sınav sayfası verileri getirilirken hata oluştu."),
                "error",
            );
        }
    };

    useEffect(() => {
        getPageData();
    }, []);

    useEffect(() => {
        setEditedGrades({});
        setRowErrors({});
    }, [selectedLessonId]);

    const lessonOptions = useMemo(() => {
        return createLessonOptions(lessons);
    }, [lessons]);

    const classroomOptions = useMemo(() => {
        return createClassroomOptions(classrooms);
    }, [classrooms]);

    const examRows = useMemo(() => {
        if (!selectedLessonId) return [];

        return buildExamRows({
            students,
            exams,
            classrooms,
            selectedLessonId,
            editedGrades,
        });
    }, [students, exams, classrooms, selectedLessonId, editedGrades]);

    const filteredRows = useMemo(() => {
        return filterExamRows({
            rows: examRows,
            search,
            classroomFilter,
        });
    }, [examRows, search, classroomFilter]);

    const handleGradeChange = (studentId, field, value) => {
        const normalizedValue = normalizeGradeInput(value);

        setEditedGrades((prev) => {
            const currentRow =
                prev[studentId] ||
                examRows.find((row) => row.studentId === studentId) ||
                {};

            return {
                ...prev,
                [studentId]: {
                    exam1: currentRow.exam1 || "",
                    exam2: currentRow.exam2 || "",
                    project: currentRow.project || "",
                    activity1: currentRow.activity1 || "",
                    activity2: currentRow.activity2 || "",
                    activity3: currentRow.activity3 || "",
                    [field]: normalizedValue,
                },
            };
        });

        setRowErrors((prev) => ({
            ...prev,
            [studentId]: "",
        }));
    };

    const validateRow = (row) => {
        if (!selectedLessonId) {
            return "Önce ders seçmelisiniz.";
        }

        const hasAnyGrade = examGradeFields.some((field) => {
            return row[field.key] !== "" && row[field.key] !== null;
        });

        if (!hasAnyGrade) {
            return "En az bir not alanı girilmelidir.";
        }

        return "";
    };

    const handleSaveRow = async (row) => {
        const validationMessage = validateRow(row);

        if (validationMessage) {
            setRowErrors((prev) => ({
                ...prev,
                [row.studentId]: validationMessage,
            }));

            showToast(validationMessage, "error");
            return;
        }

        const payload = {
            studentId: row.studentId,
            lessonId: selectedLessonId,
            exam1: normalizeGradeForPayload(row.exam1),
            exam2: normalizeGradeForPayload(row.exam2),
            project: normalizeGradeForPayload(row.project),
            activity1: normalizeGradeForPayload(row.activity1),
            activity2: normalizeGradeForPayload(row.activity2),
            activity3: normalizeGradeForPayload(row.activity3),
            isActive: true,
        };

        try {
            setSavingRows((prev) => ({
                ...prev,
                [row.studentId]: true,
            }));

            const result = row.examId
                ? await examService.update({
                    id: row.examId,
                    ...payload,
                })
                : await examService.create(payload);

            if (!result.isSuccess && !result.IsSuccess) {
                const message = result.message || result.Message || "Not kaydı başarısız.";
                setRowErrors((prev) => ({
                    ...prev,
                    [row.studentId]: message,
                }));
                showToast(message, "error");
                return;
            }

            await getPageData();

            setEditedGrades((prev) => {
                const next = { ...prev };
                delete next[row.studentId];
                return next;
            });

            setRowErrors((prev) => ({
                ...prev,
                [row.studentId]: "",
            }));

            showToast("Not bilgileri başarıyla kaydedildi.");
        } catch (error) {
            console.error(error);

            const message = getErrorMessage(error, "Not kaydedilirken hata oluştu.");

            setRowErrors((prev) => ({
                ...prev,
                [row.studentId]: message,
            }));

            showToast(message, "error");
        } finally {
            setSavingRows((prev) => ({
                ...prev,
                [row.studentId]: false,
            }));
        }
    };

    const handleResetRow = (studentId) => {
        setEditedGrades((prev) => {
            const next = { ...prev };
            delete next[studentId];
            return next;
        });

        setRowErrors((prev) => ({
            ...prev,
            [studentId]: "",
        }));
    };

    const handleExportExamsPdf = () => {
        exportToPdf({
            title: "Sınav Notları Listesi",
            fileName: "sinav-notlari-listesi.pdf",
            columns: examPdfColumns,
            data: filteredRows,
        });
    };

    return {
        students,
        exams,
        lessons,
        classrooms,
        selectedLessonId,
        setSelectedLessonId,
        classroomFilter,
        setClassroomFilter,
        search,
        setSearch,
        lessonOptions,
        classroomOptions,
        examRows,
        filteredRows,
        savingRows,
        rowErrors,
        toast,
        handleGradeChange,
        handleSaveRow,
        handleResetRow,
        handleExportExamsPdf,
    };
}