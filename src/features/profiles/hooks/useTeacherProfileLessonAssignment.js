import { useEffect, useState } from "react";

import { classService } from "../../classes/services/classService";
import { lessonService } from "../../lessons/services/lessonService";
import { teacherLessonService } from "../../teacherLessons/services/teacherLessonService";

import { emptyTeacherLessonAssignForm } from "../../teachers/constants/teacherConstants";

const getTeacherId = (teacher) => {
    return teacher?.id || teacher?.Id || "";
};

const normalizeResultData = (result) => {
    return result?.data || result?.Data || [];
};

export function useTeacherProfileLessonAssignment({
    profileType,
    teacher,
    reloadProfile,
    showToast,
}) {
    const [lessons, setLessons] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    const [assignFormData, setAssignFormData] = useState(
        emptyTeacherLessonAssignForm
    );

    const [assignErrors, setAssignErrors] = useState({});

    const openModal = (modalId) => {
        document.getElementById(modalId)?.showModal();
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId)?.close();
    };

    useEffect(() => {
        if (profileType !== "teacher") return;

        const getOptions = async () => {
            try {
                const [lessonResult, classroomResult] = await Promise.all([
                    lessonService.getAll(),
                    classService.getAll(),
                ]);

                if (lessonResult?.isSuccess) {
                    setLessons(normalizeResultData(lessonResult));
                }

                if (classroomResult?.isSuccess) {
                    setClassrooms(normalizeResultData(classroomResult));
                }
            } catch (error) {
                console.error(error);
            }
        };

        getOptions();
    }, [profileType]);

    const handleOpenAssignLessonModal = (modalId) => {
        setAssignFormData(emptyTeacherLessonAssignForm);
        setAssignErrors({});
        openModal(modalId);
    };

    const handleCloseAssignLessonModal = (modalId) => {
        setAssignFormData(emptyTeacherLessonAssignForm);
        setAssignErrors({});
        closeModal(modalId);
    };

    const validateAssignForm = () => {
        const nextErrors = {};

        if (!assignFormData.lessonId) {
            nextErrors.lessonId = "Ders seçimi zorunludur.";
        }

        if (!assignFormData.classroomIds?.length) {
            nextErrors.classroomIds = "En az bir sınıf seçmelisiniz.";
        }

        setAssignErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleAssignLessonSubmit = async (modalId) => {
        if (!validateAssignForm()) return;

        const teacherId = getTeacherId(teacher);

        if (!teacherId) {
            setAssignErrors({
                general: "Öğretmen bilgisi bulunamadı.",
            });

            return;
        }

        try {
            const requests = assignFormData.classroomIds.map((classroomId) =>
                teacherLessonService.create({
                    teacherId,
                    lessonId: assignFormData.lessonId,
                    classroomId,
                })
            );

            const results = await Promise.all(requests);

            const failedResult = results.find((result) => !result.isSuccess);

            if (failedResult) {
                setAssignErrors({
                    general: failedResult.message || "Ders atama işlemi başarısız.",
                });

                return;
            }

            setAssignFormData(emptyTeacherLessonAssignForm);
            setAssignErrors({});

            closeModal(modalId);

            await reloadProfile?.();

            showToast?.("Ders atama işlemi başarıyla tamamlandı.");
        } catch (error) {
            console.error(error);

            setAssignErrors({
                general: error.message || "Sunucu hatası oluştu.",
            });
        }
    };

    return {
        lessons,
        classrooms,
        assignFormData,
        setAssignFormData,
        assignErrors,
        handleOpenAssignLessonModal,
        handleCloseAssignLessonModal,
        handleAssignLessonSubmit,
    };
}