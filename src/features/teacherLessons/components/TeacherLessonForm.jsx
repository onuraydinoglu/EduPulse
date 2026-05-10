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
        classroomIds: nextClassroomIds,
      };
    });
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

  const teacherOptions = [
    { value: "", label: "Öğretmen seçiniz" },
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

  const classroomOptions = [
    { value: "", label: "Sınıf seçiniz" },
    ...classrooms.map((classroom) => ({
      value: classroom.id || classroom.Id,
      label: getClassroomLabel(classroom),
    })),
  ];

  const selectedClassroomIds = Array.isArray(formData.classroomIds)
    ? formData.classroomIds
    : [];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {errors?.general && (
        <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      <FormSelect
        label="Öğretmen"
        value={formData.teacherId || ""}
        onChange={(value) => handleChange("teacherId", value)}
        options={teacherOptions}
        error={errors.teacherId}
      />

      <FormSelect
        label="Ders"
        value={formData.lessonId || ""}
        onChange={(value) => handleChange("lessonId", value)}
        options={lessonOptions}
        error={errors.lessonId}
      />

      {editMode ? (
        <FormSelect
          label="Sınıf"
          value={formData.classroomId || ""}
          onChange={(value) => handleChange("classroomId", value)}
          options={classroomOptions}
          error={errors.classroomId}
        />
      ) : (
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
      )}

      {editMode && (
        <ActiveCheckbox
          checked={formData.isActive !== false}
          onChange={(value) => handleChange("isActive", value)}
        />
      )}
    </form>
  );
}

export default TeacherLessonForm;