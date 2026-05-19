export const getStoredAuthUser = () => {
    try {
      const rawUser = localStorage.getItem("edupulse_user");
      if (!rawUser) return null;
  
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  };
  
  export const getCurrentRole = () => {
    const storedUser = getStoredAuthUser();
  
    return (
      storedUser?.roleName ||
      storedUser?.RoleName ||
      storedUser?.role ||
      storedUser?.Role ||
      storedUser?.user?.roleName ||
      storedUser?.user?.RoleName ||
      storedUser?.user?.role ||
      storedUser?.user?.Role ||
      ""
    )
      .toString()
      .toLowerCase();
  };
  
  export const getCurrentTeacherId = () => {
    const storedUser = getStoredAuthUser();
  
    return (
      storedUser?.teacherId ||
      storedUser?.TeacherId ||
      storedUser?.user?.teacherId ||
      storedUser?.user?.TeacherId ||
      storedUser?.id ||
      storedUser?.Id ||
      storedUser?.user?.id ||
      storedUser?.user?.Id ||
      ""
    ).toString();
  };
  
  export const normalizeId = (value) => {
    return (value || "").toString().trim().toLowerCase();
  };
  
  export const isSchoolAdmin = () => getCurrentRole() === "schooladmin";
  
  export const isTeacher = () => getCurrentRole() === "teacher";
  
  export const isSuperAdmin = () => getCurrentRole() === "superadmin";
  
  export const canManageSchoolData = () => {
    const role = getCurrentRole();
  
    return role === "schooladmin" || role === "officer";
  };