import FormFields from "../../../components/common/FormFields";

import {
    getLessonId,
    getLessonName,
    getStudentFullName,
    getStudentId,
    normalizeSelectOptions,
} from "../utils/examFormatters";

function ExamForm({
    formData,
    setFormData,
    students = [],
    lessons = [],
    errors = {},
    isEditing = false,
}) {
    const studentOptions = [
        {
            label: "Öğrenci seçiniz",
            value: "",
        },
        ...normalizeSelectOptions(students, getStudentFullName, getStudentId),
    ];

    const lessonOptions = [
        {
            label: "Ders seçiniz",
            value: "",
        },
        ...normalizeSelectOptions(lessons, getLessonName, getLessonId),
    ];

    const examFields = [
        {
            name: "studentId",
            label: "Öğrenci",
            type: "select",
            options: studentOptions,
        },
        {
            name: "lessonId",
            label: "Ders",
            type: "select",
            options: lessonOptions,
        },
        {
            name: "exam1",
            label: "1. Sınav",
            type: "number",
            placeholder: "0 - 100",
        },
        {
            name: "exam2",
            label: "2. Sınav",
            type: "number",
            placeholder: "0 - 100",
        },
        {
            name: "project",
            label: "Proje",
            type: "number",
            placeholder: "0 - 100",
        },
        {
            name: "activity1",
            label: "Sınıf İçi 1",
            type: "number",
            placeholder: "0 - 100",
        },
        {
            name: "activity2",
            label: "Sınıf İçi 2",
            type: "number",
            placeholder: "0 - 100",
        },
        {
            name: "activity3",
            label: "Sınıf İçi 3",
            type: "number",
            placeholder: "0 - 100",
        },
    ];

    return (
        <div className="space-y-4">
            {errors?.general && (
                <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                    {errors.general}
                </div>
            )}

            <FormFields
                fields={examFields}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                isEditing={isEditing}
            />
        </div>
    );
}

export default ExamForm;