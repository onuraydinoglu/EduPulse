export const PROFILE_TYPES = {
    STUDENT: "student",
    TEACHER: "teacher",
    OFFICER: "officer",
};

export const PROFILE_TYPE_LABELS = {
    [PROFILE_TYPES.STUDENT]: "Öğrenci",
    [PROFILE_TYPES.TEACHER]: "Öğretmen",
    [PROFILE_TYPES.OFFICER]: "Memur",
};

export const PROFILE_BACK_PATHS = {
    [PROFILE_TYPES.STUDENT]: "/dashboard/students",
    [PROFILE_TYPES.TEACHER]: "/dashboard/teachers",
    [PROFILE_TYPES.OFFICER]: "/dashboard/officers",
};

export const PROFILE_STATUS = {
    ACTIVE: "aktif",
    PASSIVE: "pasif",
};

export const PROFILE_MESSAGES = {
    LOAD_ERROR: "Profil bilgileri yüklenirken hata oluştu.",
    NOT_FOUND_DESCRIPTION:
        "Kayıt silinmiş olabilir veya bu profili görüntüleme yetkiniz olmayabilir.",
};