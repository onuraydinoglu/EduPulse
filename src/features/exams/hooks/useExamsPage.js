import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { classService } from "../../classes/services/classService";
import { lessonService } from "../../lessons/services/lessonService";
import { studentService } from "../../students/services/studentService";
import { teacherLessonService } from "../../teacherLessons/services/teacherLessonService";

import { exportToPdf } from "../../../utils/exportToPdf";
import { emptyExamGrades, examGradeFields } from "../constants/examConstants";
import { examPdfColumns } from "../constants/examTableColumns";
import { examService } from "../services/examService";
import {
    buildExamRows,
    createLessonOptionsFromLessons,
    createLessonOptionsFromTeacherLessons,
    filterExamRows,
    filterTeacherLessonsForClassroom,
    getClassroomName,
    getCurrentUser,
    getErrorMessage,
    normalizeGradeForPayload,
    normalizeGradeInput,
    normalizeResultData,
    unwrapSingleData,
} from "../utils/examFormatters";

export function useExamsPage() {
    const params = useParams();
    const navigate = useNavigate();

    const classroomId = params.classroomId || params.classId || params.id || "";
    const isClassroomMode = Boolean(classroomId);

    const [classroom, setClassroom] = useState(null);
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [teacherLessons, setTeacherLessons] = useState([]);

    const [selectedLessonId, setSelectedLessonId] = useState("");
    const [editedGrades, setEditedGrades] = useState({});
    const [isSavingAll, setIsSavingAll] = useState(false);
    const [rowErrors, setRowErrors] = useState({});
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
    });

    const currentUser = useMemo(() => getCurrentUser(), []);

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

    const loadPageData = async () => {
        try {
            setIsLoading(true);

            const requests = [
                studentService.getAll(),
                examService.getAll(),
                lessonService.getAll(),
            ];

            if (isClassroomMode) {
                requests.push(classService.getById(classroomId));
                requests.push(teacherLessonService.getAll());
            }

            const results = await Promise.all(requests);

            const studentsResult = results[0];
            const examsResult = results[1];
            const lessonsResult = results[2];

            setStudents(normalizeResultData(studentsResult));
            setExams(normalizeResultData(examsResult));
            setLessons(normalizeResultData(lessonsResult));

            if (isClassroomMode) {
                const classroomResult = results[3];
                const teacherLessonsResult = results[4];

                setClassroom(unwrapSingleData(classroomResult));
                setTeacherLessons(normalizeResultData(teacherLessonsResult));
            }
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(error, "Sınav verileri yüklenirken hata oluştu."),
                "error",
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classroomId]);

    const availableTeacherLessons = useMemo(() => {
        if (!isClassroomMode) return [];

        return filterTeacherLessonsForClassroom({
            teacherLessons,
            classroomId,
            currentUser,
        });
    }, [teacherLessons, classroomId, currentUser, isClassroomMode]);

    const lessonOptions = useMemo(() => {
        if (isClassroomMode) {
            return createLessonOptionsFromTeacherLessons(availableTeacherLessons);
        }

        return createLessonOptionsFromLessons(lessons);
    }, [isClassroomMode, availableTeacherLessons, lessons]);

    useEffect(() => {
        if (!lessonOptions.length) {
            setSelectedLessonId("");
            return;
        }

        setSelectedLessonId((prev) => {
            const stillExists = lessonOptions.some((item) => item.value === prev);
            return stillExists ? prev : lessonOptions[0].value;
        });
    }, [lessonOptions]);

    useEffect(() => {
        setEditedGrades({});
        setRowErrors({});
    }, [selectedLessonId]);

    const examRows = useMemo(() => {
        if (!selectedLessonId) return [];

        return buildExamRows({
            students,
            exams,
            classroomId: isClassroomMode ? classroomId : "",
            selectedLessonId,
            editedGrades,
        });
    }, [
        students,
        exams,
        classroomId,
        isClassroomMode,
        selectedLessonId,
        editedGrades,
    ]);

    const filteredRows = useMemo(() => {
        return filterExamRows(examRows, search);
    }, [examRows, search]);

    const classroomName = useMemo(() => {
        return getClassroomName(classroom);
    }, [classroom]);

    const handleGradeChange = (studentId, field, value) => {
        const normalizedValue = normalizeGradeInput(value);

        setEditedGrades((prev) => {
            const currentRow =
                prev[studentId] ||
                examRows.find((row) => row.studentId === studentId) ||
                emptyExamGrades;

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
            return isClassroomMode
                ? "Bu sınıf için not girişi yapılabilecek ders bulunamadı."
                : "Önce ders seçmelisiniz.";
        }

        const hasAnyGrade = examGradeFields.some((field) => {
            return row[field.key] !== "" && row[field.key] !== null;
        });

        if (!hasAnyGrade) {
            return "En az bir not alanı girilmelidir.";
        }

        return "";
    };

    const createPayloadFromRow = (row) => {
        return {
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
    };

    const handleSaveAllGrades = async () => {
        const changedRows = examRows.filter((row) => row.isDirty);

        if (!changedRows.length) {
            showToast("Kaydedilecek değişiklik bulunmuyor.", "info");
            return;
        }

        const nextErrors = {};

        changedRows.forEach((row) => {
            const validationMessage = validateRow(row);

            if (validationMessage) {
                nextErrors[row.studentId] = validationMessage;
            }
        });

        if (Object.keys(nextErrors).length > 0) {
            setRowErrors((prev) => ({
                ...prev,
                ...nextErrors,
            }));

            showToast("Bazı öğrencilerin not bilgileri eksik veya hatalı.", "error");
            return;
        }

        try {
            setIsSavingAll(true);
            setRowErrors({});

            const results = await Promise.all(
                changedRows.map((row) => {
                    const payload = createPayloadFromRow(row);

                    if (row.examId) {
                        return examService.update({
                            id: row.examId,
                            ...payload,
                        });
                    }

                    return examService.create(payload);
                }),
            );

            const failedResults = results.filter((result) => {
                return result?.isSuccess === false || result?.IsSuccess === false;
            });

            if (failedResults.length > 0) {
                const firstMessage =
                    failedResults[0]?.message ||
                    failedResults[0]?.Message ||
                    "Bazı not kayıtları kaydedilemedi.";

                showToast(firstMessage, "error");
                return;
            }

            const refreshedExams = await examService.getAll();
            setExams(normalizeResultData(refreshedExams));
            setEditedGrades({});
            setRowErrors({});

            showToast(`${changedRows.length} öğrencinin notu başarıyla kaydedildi.`);
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(error, "Notlar kaydedilirken hata oluştu."),
                "error",
            );
        } finally {
            setIsSavingAll(false);
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

    const handleBackToClasses = () => {
        if (classroomId) {
            navigate(`/dashboard/classes/${classroomId}`);
            return;
        }

        navigate("/dashboard/classes");
    };

    const handleExportExamsPdf = () => {
        exportToPdf({
            title: isClassroomMode
                ? `${classroomName} Sınav Notları`
                : "Sınav Notları Listesi",
            fileName: isClassroomMode
                ? `${classroomName}-sinav-notlari.pdf`
                : "sinav-notlari-listesi.pdf",
            columns: examPdfColumns,
            data: filteredRows,
        });
    };

    return {
        isClassroomMode,
        isLoading,
        classroomId,
        classroomName,
        selectedLessonId,
        setSelectedLessonId,
        lessonOptions,
        examRows,
        filteredRows,
        search,
        setSearch,
        isSavingAll,
        rowErrors,
        toast,
        handleGradeChange,
        handleSaveAllGrades,
        handleResetRow,
        handleBackToClasses,
        handleExportExamsPdf,
    };
}