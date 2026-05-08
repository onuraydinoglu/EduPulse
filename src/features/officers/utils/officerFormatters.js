export const getOfficerId = (officer) => {
    return officer?.id || officer?.Id || "";
  };
  
  export const getOfficerFirstName = (officer) => {
    return officer?.firstName || officer?.FirstName || "";
  };
  
  export const getOfficerLastName = (officer) => {
    return officer?.lastName || officer?.LastName || "";
  };
  
  export const getOfficerFullName = (officer) => {
    return (
      officer?.fullName ||
      officer?.FullName ||
      `${getOfficerFirstName(officer)} ${getOfficerLastName(officer)}`.trim() ||
      "-"
    );
  };
  
  export const getOfficerEmail = (officer) => {
    return officer?.email || officer?.Email || "";
  };
  
  export const getOfficerPhoneNumber = (officer) => {
    return officer?.phoneNumber || officer?.PhoneNumber || "";
  };
  
  export const getOfficerRoleName = (officer) => {
    return officer?.roleName || officer?.RoleName || "";
  };
  
  export const getOfficerIsActive = (officer) => {
    return officer?.isActive !== false && officer?.IsActive !== false;
  };
  
  export const getOfficerStatus = (officer) => {
    return getOfficerIsActive(officer) ? "aktif" : "pasif";
  };
  
  export const getOfficerStatusLabel = (officer) => {
    return getOfficerIsActive(officer) ? "Aktif" : "Pasif";
  };
  
  export const getOfficerTemporaryPassword = (
    officer,
    temporaryPasswords = {},
  ) => {
    const email = getOfficerEmail(officer);
  
    return (
      temporaryPasswords[email] ||
      officer?.temporaryPassword ||
      officer?.TemporaryPassword ||
      officer?.password ||
      officer?.Password ||
      officer?.generatedPassword ||
      officer?.GeneratedPassword ||
      "-"
    );
  };
  
  export const isOfficerUser = (user) => {
    return getOfficerRoleName(user).toLowerCase() === "officer";
  };
  
  export const filterOfficers = (
    officers = [],
    search = "",
    statusFilter = "all",
  ) => {
    const normalizedSearch = search.toLowerCase().trim();
  
    return officers.filter((officer) => {
      const fullName = getOfficerFullName(officer).toLowerCase();
      const email = getOfficerEmail(officer).toLowerCase();
      const phoneNumber = getOfficerPhoneNumber(officer).toLowerCase();
      const isActive = getOfficerIsActive(officer);
  
      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phoneNumber.includes(normalizedSearch);
  
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "passive" && !isActive);
  
      return matchesSearch && matchesStatus;
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