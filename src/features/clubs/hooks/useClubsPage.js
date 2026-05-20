import { useEffect, useMemo, useState } from "react";
import {
  AcademicCapIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { clubService } from "../services/clubService";
import { teacherService } from "../../teachers/services/teacherService";
import { clubMemberService } from "../../clubMembers/services/clubMemberService";
import { exportToPdf } from "../../../utils/exportToPdf";
import { emptyClubForm } from "../constants/clubConstants";
import { clubPdfColumns } from "../constants/clubTableColumns";
import { getCurrentRole } from "../../../utils/authUser";

import {
  filterClubs,
  getBackendFieldErrors,
  getClubAdvisorTeacherId,
  getClubAdvisorTeacherName,
  getClubId,
  getClubIsActive,
  getClubMemberCount,
  getClubName,
  getErrorMessage,
} from "../utils/clubFormatters";

const normalizeResultData = (result) => {
  return result?.data || result?.Data || result || [];
};

const normalizeId = (value) => {
  return (value || "").toString().trim().toLowerCase();
};

const getMembershipClubId = (membership) => {
  return (
    membership?.clubId ||
    membership?.ClubId ||
    membership?.club?.id ||
    membership?.Club?.Id ||
    membership?.club?.Id ||
    membership?.Club?.id ||
    ""
  );
};

const getMembershipClubName = (membership) => {
  return (
    membership?.clubName ||
    membership?.ClubName ||
    membership?.club?.name ||
    membership?.Club?.Name ||
    membership?.club?.Name ||
    membership?.Club?.name ||
    "-"
  );
};

const getMembershipIsActive = (membership) => {
  return membership?.isActive ?? membership?.IsActive ?? true;
};

export function useClubsPage() {
  const [clubs, setClubs] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [clubMembers, setClubMembers] = useState([]);

  const [formData, setFormData] = useState(emptyClubForm);

  const [errors, setErrors] = useState({});

  const [editingClubId, setEditingClubId] = useState(null);

  const [deletingClubId, setDeletingClubId] = useState(null);

  const [toast, setToast] = useState({
    message: "",

    type: "success",
  });

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const currentRole = getCurrentRole();

  const isStudent = currentRole === "student";

  const isEditing = editingClubId !== null;

  const showToast = (message, type = "success") => {
    setToast({
      message,

      type,
    });

    setTimeout(() => {
      setToast({
        message: "",

        type: "success",
      });
    }, 2500);
  };

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const loadClubs = async () => {
    try {
      const result = await clubService.getAll();

      if (result?.isSuccess === false || result?.IsSuccess === false) {
        showToast(
          result.message || result.Message || "Kulüpler yüklenirken hata oluştu.",
          "error",
        );

        return;
      }

      const data = normalizeResultData(result);

      setClubs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Kulüpler yüklenirken hata oluştu."),
        "error",
      );
    }
  };

  const loadTeachers = async () => {
    if (isStudent) {
      setTeachers([]);

      return;
    }

    try {
      const result = await teacherService.getAll();

      if (result?.isSuccess === false || result?.IsSuccess === false) {
        showToast(
          result.message || result.Message || "Öğretmenler yüklenirken hata oluştu.",

          "error",
        );

        return;
      }

      const data = normalizeResultData(result);

      const activeTeachers = Array.isArray(data)
        ? data.filter((teacher) => {
            return teacher.isActive !== false && teacher.IsActive !== false;
          })
        : [];

      setTeachers(activeTeachers);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Öğretmenler yüklenirken hata oluştu."),
        "error",
      );
    }
  };

  const loadClubMembers = async () => {
    if (!isStudent) {
      setClubMembers([]);

      return;
    }

    try {
      const result = await clubMemberService.getMyMemberships();

      const data = normalizeResultData(result);

      setClubMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Kulüp üyelik bilgisi yüklenirken hata oluştu."),
        "error",
      );
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([loadClubs(), loadTeachers(), loadClubMembers()]);
    };

    loadInitialData();
  }, []);

  const filteredClubs = useMemo(() => {
    return filterClubs(clubs, teachers, search, statusFilter);
  }, [clubs, teachers, search, statusFilter]);

  const studentClubMembership = useMemo(() => {
    if (!isStudent) return null;

    return (
      clubMembers.find((membership) => {
        return getMembershipIsActive(membership);
      }) || null
    );
  }, [clubMembers, isStudent]);

  const studentClub = useMemo(() => {
    if (!isStudent || !studentClubMembership) return null;

    const membershipClubId = getMembershipClubId(studentClubMembership);

    return (
      clubs.find((club) => {
        return normalizeId(getClubId(club)) === normalizeId(membershipClubId);
      }) || null
    );
  }, [clubs, isStudent, studentClubMembership]);

  const studentClubStats = useMemo(() => {
    if (!isStudent) return [];

    const clubName = studentClub
      ? getClubName(studentClub)
      : studentClubMembership
        ? getMembershipClubName(studentClubMembership)
        : "-";

    return [
      {
        title: "Katıldığı Kulüp",
        value: clubName,
        description: "Öğrencinin kayıtlı olduğu kulüp",
        icon: UserGroupIcon,
        color: "primary",
      },
      {
        title: "Sorumlu Hoca",
        value: studentClub
          ? getClubAdvisorTeacherName(studentClub, teachers) || "-"
          : "-",
        description: "Kulübün sorumlu öğretmeni",
        icon: AcademicCapIcon,
        color: "info",
      },
      {
        title: "Üye Sayısı",
        value: studentClub ? getClubMemberCount(studentClub) : 0,
        description: "Kulüpteki toplam üye sayısı",
        icon: UsersIcon,
        color: "success",
      },
    ];
  }, [isStudent, studentClub, studentClubMembership, teachers]);

  const handleOpenCreateModal = (modalId) => {
    setEditingClubId(null);

    setFormData(emptyClubForm);

    setErrors({});

    openModal(modalId);
  };

  const handleOpenEditModal = (club, modalId) => {
    setEditingClubId(getClubId(club));

    setErrors({});

    setFormData({
      name: getClubName(club) === "-" ? "" : getClubName(club),

      advisorTeacherId: getClubAdvisorTeacherId(club),

      isActive: String(getClubIsActive(club)),
    });

    openModal(modalId);
  };

  const handleCloseClubModal = (modalId) => {
    setEditingClubId(null);

    setFormData(emptyClubForm);

    setErrors({});

    closeModal(modalId);
  };

  const handleOpenDeleteModal = (id, modalId) => {
    setDeletingClubId(id);

    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingClubId(null);

    closeModal(modalId);
  };

  const validateClubForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Kulüp adı zorunludur.";
    }

    if (!formData.advisorTeacherId) {
      newErrors.advisorTeacherId = "Sorumlu öğretmen seçiniz.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const prepareClubPayload = () => {
    return {
      name: formData.name.trim(),

      advisorTeacherId: formData.advisorTeacherId,

      isActive: isEditing
        ? formData.isActive === true || formData.isActive === "true"
        : true,
    };
  };

  const handleSubmit = async (modalId) => {
    if (!validateClubForm()) {
      showToast("Eksik veya hatalı alanlar var.", "error");

      return;
    }

    const preparedData = prepareClubPayload();

    try {
      const result = isEditing
        ? await clubService.update({
            id: editingClubId,

            ...preparedData,
          })
        : await clubService.create(preparedData);

      if (result?.isSuccess === false || result?.IsSuccess === false) {
        const message = result.message || result.Message || "İşlem başarısız.";

        setErrors({
          general: message,
        });

        showToast(message, "error");

        return;
      }

      await loadClubs();

      handleCloseClubModal(modalId);

      showToast(isEditing ? "Kulüp güncellendi." : "Kulüp eklendi.");
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(error, "İşlem sırasında hata oluştu.");

      const backendFieldErrors = getBackendFieldErrors(error);

      setErrors({
        ...backendFieldErrors,

        general: message,
      });

      showToast(message, "error");
    }
  };

  const handleDelete = async (modalId) => {
    if (!deletingClubId) return;

    try {
      const result = await clubService.delete(deletingClubId);

      if (result?.isSuccess === false || result?.IsSuccess === false) {
        showToast(result.message || result.Message || "Kulüp silinemedi.", "error");

        return;
      }

      await loadClubs();

      handleCloseDeleteModal(modalId);

      showToast("Kulüp silindi.");
    } catch (error) {
      console.error(error);

      showToast(
        getErrorMessage(error, "Kulüp silinirken hata oluştu."),
        "error",
      );
    }
  };

  const handleExportClubsPdf = () => {
    exportToPdf({
      title: "Kulüp Listesi",

      fileName: "kulup-listesi.pdf",

      columns: clubPdfColumns,

      data: clubs,
    });
  };

  return {
    clubs,
    filteredClubs,
    teachers,
    formData,
    setFormData,
    errors,
    isEditing,
    deletingClubId,
    toast,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isStudent,
    studentClubStats,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseClubModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportClubsPdf,
  };
}