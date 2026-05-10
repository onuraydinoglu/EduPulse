import { BookOpenIcon } from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import FormSelect from "../../../components/ui/FormSelect";
import Modal from "../../../components/ui/Modal";

const getTeacherName = (teacher) => {
    if (!teacher) return "-";

    return (
        teacher.fullName ||
        teacher.FullName ||
        `${teacher.firstName || teacher.FirstName || ""} ${teacher.lastName || teacher.LastName || ""
            }`.trim() ||
        "-"
    );
};

const getTeacherBranch = (teacher) => {
    if (!teacher) return "-";

    return (
        teacher.branchLessonName ||
        teacher.BranchLessonName ||
        teacher.department ||
        teacher.Department ||
        "Branş / departman bilgisi yok"
    );
};

const getClassroomLabel = (classroom) => {
    return (
        classroom.name ||
        classroom.Name ||
        classroom.classroomName ||
        classroom.ClassroomName ||
        `${classroom.grade || classroom.Grade || ""}-${classroom.section || classroom.Section || ""
            }`.trim() ||
        "-"
    );
};

function TeacherLessonAssignModal({
    modalId,
    teacher,
    formData,
    setFormData,
    lessons = [],
    classrooms = [],
    errors = {},
    onClose,
    onSubmit,
}) {
    const selectedClassroomIds = Array.isArray(formData.classroomIds)
        ? formData.classroomIds
        : [];

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleClassroomToggle = (classroomId) => {
        setFormData((prev) => {
            const currentClassroomIds = Array.isArray(prev.classroomIds)
                ? prev.classroomIds
                : [];

            const nextClassroomIds = currentClassroomIds.includes(classroomId)
                ? currentClassroomIds.filter((id) => id !== classroomId)
                : [...currentClassroomIds, classroomId];

            return {
                ...prev,
                classroomIds: nextClassroomIds,
            };
        });
    };

    const lessonOptions = [
        { value: "", label: "Ders seçiniz" },
        ...lessons.map((lesson) => ({
            value: lesson.id || lesson.Id,
            label:
                lesson.name ||
                lesson.Name ||
                lesson.lessonName ||
                lesson.LessonName ||
                "-",
        })),
    ];

    return (
        <Modal
            id={modalId}
            title="Ders Atama"
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>

                    <Button onClick={onSubmit}>Kaydet</Button>
                </>
            }
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
                className="space-y-5"
            >
                {errors.general && (
                    <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                        {errors.general}
                    </div>
                )}

                <div className="rounded-2xl border border-base-300 bg-base-200/40 px-4 py-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <BookOpenIcon className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">
                                Seçilen Öğretmen
                            </p>

                            <h3 className="mt-1 text-base font-bold text-base-content">
                                {getTeacherName(teacher)}
                            </h3>

                            <p className="mt-1 text-sm text-base-content/60">
                                {getTeacherBranch(teacher)}
                            </p>
                        </div>
                    </div>
                </div>

                <FormSelect
                    label="Ders"
                    value={formData.lessonId || ""}
                    onChange={(value) => handleChange("lessonId", value)}
                    options={lessonOptions}
                    error={errors.lessonId}
                />

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-base-content">
                            Sınıflar
                        </label>

                        {selectedClassroomIds.length > 0 && (
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                {selectedClassroomIds.length} sınıf seçildi
                            </span>
                        )}
                    </div>

                    <div className="max-h-56 overflow-y-auto rounded-xl border border-base-300 bg-base-100 p-3">
                        {classrooms.length === 0 ? (
                            <p className="text-sm text-base-content/60">
                                Listelenecek sınıf bulunamadı.
                            </p>
                        ) : (
                            <div className="grid gap-2 sm:grid-cols-2">
                                {classrooms.map((classroom) => {
                                    const classroomId = classroom.id || classroom.Id;
                                    const checked = selectedClassroomIds.includes(classroomId);

                                    return (
                                        <label
                                            key={classroomId}
                                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked
                                                    ? "border-primary bg-primary/10 text-primary"
                                                    : "border-base-300 bg-base-100 text-base-content hover:bg-base-200/60"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary checkbox-sm"
                                                checked={checked}
                                                onChange={() => handleClassroomToggle(classroomId)}
                                            />

                                            <span className="font-medium">
                                                {getClassroomLabel(classroom)}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {errors.classroomIds && (
                        <p className="text-xs text-error">{errors.classroomIds}</p>
                    )}

                    <p className="text-xs text-base-content/50">
                        Aynı öğretmen ve ders için birden fazla sınıf seçebilirsiniz.
                    </p>
                </div>
            </form>
        </Modal>
    );
}

export default TeacherLessonAssignModal;