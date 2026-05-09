export const getClassId = (classItem) => {
  return classItem?.id || classItem?.Id || "";
};

export const getClassGrade = (classItem) => {
  return classItem?.grade || classItem?.Grade || "";
};

export const getClassSection = (classItem) => {
  return classItem?.section || classItem?.Section || "";
};

export const getClassTeacherId = (classItem) => {
  return classItem?.teacherId || classItem?.TeacherId || "";
};

export const getClassIsActive = (classItem) => {
  return classItem?.isActive ?? classItem?.IsActive ?? true;
};

export const getClassStudentCount = (classItem) => {
  return (
    classItem?.studentCount ||
    classItem?.StudentCount ||
    classItem?.studentsCount ||
    classItem?.StudentsCount ||
    0
  );
};

export const getClassName = (classItem) => {
  return (
    classItem?.name ||
    classItem?.Name ||
    classItem?.className ||
    classItem?.ClassName ||
    `${getClassGrade(classItem)}-${getClassSection(classItem)}` ||
    "-"
  );
};

export const getTeacherId = (teacher) => {
  return teacher?.id || teacher?.Id || "";
};

export const getTeacherFullName = (teacher) => {
  return (
    teacher?.fullName ||
    teacher?.FullName ||
    `${teacher?.firstName || teacher?.FirstName || ""} ${teacher?.lastName || teacher?.LastName || ""
      }`.trim() ||
    "-"
  );
};

export const findClassTeacher = (classItem, teachers = []) => {
  const teacherId = getClassTeacherId(classItem);

  if (!teacherId) return null;

  return teachers.find((teacher) => getTeacherId(teacher) === teacherId) || null;
};

export const getClassTeacherName = (classItem, teachers = []) => {
  return (
    classItem?.teacher ||
    classItem?.Teacher ||
    classItem?.teacherName ||
    classItem?.TeacherName ||
    classItem?.advisorTeacherName ||
    classItem?.AdvisorTeacherName ||
    getTeacherFullName(findClassTeacher(classItem, teachers))
  );
};

export const mapTeachersToOptions = (teachers = []) => {
  return teachers.map((teacher) => ({
    value: getTeacherId(teacher),
    label: getTeacherFullName(teacher),
  }));
};

export const filterClasses = (
  classes = [],
  teachers = [],
  search = "",
  gradeFilter = "all",
) => {
  const normalizedSearch = search.toLowerCase().trim();

  return classes.filter((classItem) => {
    const className = getClassName(classItem).toLowerCase();
    const teacherName = getClassTeacherName(classItem, teachers).toLowerCase();
    const grade = String(getClassGrade(classItem));

    const matchesSearch =
      !normalizedSearch ||
      className.includes(normalizedSearch) ||
      teacherName.includes(normalizedSearch);

    const matchesGrade = gradeFilter === "all" || grade === gradeFilter;

    return matchesSearch && matchesGrade;
  });
};

export const getErrorMessage = (error, fallback) => {
  const data = error?.response?.data;

  if (typeof data === "string") return data;

  return (
    data?.message ||
    data?.Message ||
    data?.error ||
    data?.Error ||
    data?.title ||
    data?.errors?.[0] ||
    data?.Errors?.[0] ||
    error?.message ||
    fallback
  );
};

export const getBackendFieldErrors = (error) => {
  const data = error?.response?.data;
  const backendErrors = data?.errors || data?.Errors;

  if (!backendErrors || Array.isArray(backendErrors)) return {};

  const fieldErrors = {};

  Object.entries(backendErrors).forEach(([key, value]) => {
    const fieldName = key.charAt(0).toLowerCase() + key.slice(1);

    fieldErrors[fieldName] = Array.isArray(value) ? value[0] : value;
  });

  return fieldErrors;
};