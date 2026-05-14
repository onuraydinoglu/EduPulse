import FormSelect from "../../../components/ui/FormSelect";
import ActiveCheckbox from "../../../components/ui/ActiveCheckbox";

function TeacherLessonForm({
  formData,
  setFormData,
  teachers = [],
  lessons = [],
  classrooms = [],
  errors = {},
  onSubmit,
  isEdit = false,
  isEditing = false,
}) {
  const editMode = isEdit || isEditing;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClassroomToggle = (classroomId) => {
    setFormData((prev) => {
      const selectedClassroomIds = Array.isArray(prev.classroomIds)
        ? prev.classroomIds
        : [];

      const nextClassroomIds = selectedClassroomIds.includes(classroomId)
        ? selectedClassroomIds.filter((id) => id !== classroomId)
        : [...selectedClassroomIds, classroomId];

      return {
        ...prev,
        classroomId: nextClassroomIds[0] || "",
        classroomIds: nextClassroomIds,
      };
    });
  };

  const getClassroomLabel = (classroom) => {
    const grade = classroom.grade || classroom.Grade || "";
    const section = classroom.section || classroom.Section || "";

    return (
      classroom.name ||
      classroom.Name ||
      classroom.classroomName ||
      classroom.ClassroomName ||
      `${grade}-${section}`.trim() ||
      "-"
    );
  };

  const teacherOptions = [
    {
      value: "",
      label: "Öğretmen seçiniz",
    },
    ...teachers.map((teacher) => {
      const firstName = teacher.firstName || teacher.FirstName || "";
      const lastName = teacher.lastName || teacher.LastName || "";

      return {
        value: teacher.id || teacher.Id,
        label:
          teacher.fullName ||
          teacher.FullName ||
          `${firstName} ${lastName}`.trim() ||
          "-",
      };
    }),
  ];

  const lessonOptions = [
    {
      value: "",
      label: "Ders seçiniz",
    },
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

  const selectedClassroomIds = Array.isArray(formData.classroomIds)
    ? formData.classroomIds
    : [];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {errors?.general && (
        <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm font-medium text-error">
          {errors.general}
        </div>
      )}

      <FormSelect
        label="Öğretmen"
        value={formData.teacherId}
        onChange={(value) => handleChange("teacherId", value)}
        options={teacherOptions}
        error={errors.teacherId}
      />

      <FormSelect
        label="Ders"
        value={formData.lessonId}
        onChange={(value) => handleChange("lessonId", value)}
        options={lessonOptions}
        error={errors.lessonId}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label className="text-sm font-semibold text-base-content">
            Sınıflar
          </label>

          {selectedClassroomIds.length > 0 && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {selectedClassroomIds.length} sınıf seçildi
            </span>
          )}
        </div>

        {classrooms.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-100/70 p-4 text-sm text-base-content/60">
            Listelenecek sınıf bulunamadı.
          </div>
        ) : (
          <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto rounded-2xl border border-base-300 bg-base-100/70 p-3 sm:grid-cols-2">
            {classrooms.map((classroom) => {
              const classroomId = classroom.id || classroom.Id;
              const checked = selectedClassroomIds.includes(classroomId);

              return (
                <label
                  key={classroomId}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${checked
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-base-300 bg-base-100 text-base-content/75 hover:border-primary/30"
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

        {errors.classroomIds && (
          <p className="text-xs font-medium text-error">
            {errors.classroomIds}
          </p>
        )}

        <p className="text-xs text-base-content/50">
          Aynı öğretmen ve ders için birden fazla sınıf seçebilirsiniz.
        </p>
      </div>

      {editMode && (
        <ActiveCheckbox
          checked={formData.isActive}
          onChange={(value) => handleChange("isActive", value)}
        />
      )}
    </form>
  );
}

export default TeacherLessonForm;