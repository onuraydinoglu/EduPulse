export const getStudentId = (student) => {
    return student?.id || student?.Id || "";
  };
  
  export const getStudentFullName = (student) => {
    return (
      student?.fullName ||
      student?.FullName ||
      `${student?.firstName || student?.FirstName || ""} ${
        student?.lastName || student?.LastName || ""
      }`.trim() ||
      "-"
    );
  };
  
  export const getStudentFirstName = (student) => {
    return student?.firstName || student?.FirstName || "";
  };
  
  export const getStudentLastName = (student) => {
    return student?.lastName || student?.LastName || "";
  };
  
  export const getStudentEmail = (student) => {
    return student?.email || student?.Email || "";
  };
  
  export const getStudentPhoneNumber = (student) => {
    return student?.phoneNumber || student?.PhoneNumber || "";
  };
  
  export const getStudentNumber = (student) => {
    return student?.studentNumber || student?.StudentNumber || "";
  };
  
  export const getStudentClassroomId = (student) => {
    return student?.classroomId || student?.ClassroomId || "";
  };
  
  export const getStudentClassroomName = (student) => {
    return (
      student?.classroomName ||
      student?.ClassroomName ||
      student?.className ||
      student?.ClassName ||
      "-"
    );
  };
  
  export const getStudentIsActive = (student) => {
    return student?.isActive !== false && student?.IsActive !== false;
  };
  
  export const getStudentStatus = (student) => {
    return getStudentIsActive(student) ? "aktif" : "pasif";
  };
  
  export const getStudentStatusLabel = (student) => {
    return getStudentIsActive(student) ? "Aktif" : "Pasif";
  };
  
  export const getClassroomLabel = (classroom) => {
    return (
      classroom?.name ||
      classroom?.Name ||
      classroom?.className ||
      classroom?.ClassName ||
      `${classroom?.grade || classroom?.Grade || ""}/${
        classroom?.section || classroom?.Section || ""
      }`
    );
  };
  
  export const mapClassroomsToOptions = (classrooms = []) => {
    return classrooms.map((classroom) => ({
      value: classroom.id || classroom.Id,
      label: getClassroomLabel(classroom),
    }));
  };
  
  export const filterStudents = (
    students = [],
    search = "",
    statusFilter = "all",
    classroomFilter = "all",
  ) => {
    const normalizedSearch = search.toLowerCase().trim();
  
    return students.filter((student) => {
      const fullName = getStudentFullName(student).toLowerCase();
      const studentNumber = getStudentNumber(student).toLowerCase();
      const email = getStudentEmail(student).toLowerCase();
      const phoneNumber = getStudentPhoneNumber(student).toLowerCase();
      const classroomName = getStudentClassroomName(student).toLowerCase();
      const classroomId = getStudentClassroomId(student);
      const isActive = getStudentIsActive(student);
  
      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        studentNumber.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phoneNumber.includes(normalizedSearch) ||
        classroomName.includes(normalizedSearch);
  
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "passive" && !isActive);
  
      const matchesClassroom =
        classroomFilter === "all" || classroomId === classroomFilter;
  
      return matchesSearch && matchesStatus && matchesClassroom;
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