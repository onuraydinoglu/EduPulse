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

export const isSchoolAdmin = () => getCurrentRole() === "schooladmin";
export const isTeacher = () => getCurrentRole() === "teacher";
export const isSuperAdmin = () => getCurrentRole() === "superadmin";