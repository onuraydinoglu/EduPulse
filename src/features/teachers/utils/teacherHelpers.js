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

export const getTeacherFullName = (teacher) => {
  return (
    teacher.fullName ||
    `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim()
  );
};

export const filterTeachers = (teachers, search, statusFilter) => {
  const normalizedSearch = search.toLowerCase().trim();

  return teachers.filter((teacher) => {
    const fullName = getTeacherFullName(teacher).toLowerCase();

    const matchesSearch =
      fullName.includes(normalizedSearch) ||
      teacher.phoneNumber?.toLowerCase().includes(normalizedSearch) ||
      teacher.email?.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && teacher.isActive !== false) ||
      (statusFilter === "passive" && teacher.isActive === false);

    return matchesSearch && matchesStatus;
  });
};
