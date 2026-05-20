import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { exportToPdf } from "../../../utils/exportToPdf";
import { authStorage } from "../../auth/services/authStorage";
import { eventService } from "../../events/services/eventService";
import { eventMemberService } from "../services/eventMemberService";
import { emptyEventMemberForm } from "../constants/eventMemberConstants";
import { eventMemberPdfColumns } from "../constants/eventMemberTableColumns";
import {
  filterEventMembers,
  getData,
  getErrorMessage,
  getEventName,
  getSelectableStudents,
} from "../utils/eventMemberFormatters";

const getCurrentRole = () => {
  const user = authStorage.getUser();
  return user?.RoleName?.toLowerCase() || "";
};

export function useEventMembersPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const currentRole = getCurrentRole();
  const isStudentRole = currentRole === "student";

  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyEventMemberForm);
  const [errors, setErrors] = useState({});
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingMember, setSavingMember] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

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

  const fetchEvent = async () => {
    const result = await eventService.getById(eventId);
    const data = result?.data || result?.Data || result;
    setEvent(data || null);
  };

  const fetchMembers = async () => {
    const data = await eventMemberService.getByEventId(eventId);
    setMembers(Array.isArray(data) ? data : []);
  };

  const fetchStudents = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STUDENTS);
    const data = getData(response);
    setStudents(Array.isArray(data) ? data : []);
  };

  const loadPage = async () => {
    try {
      setLoading(true);

      if (isStudentRole) {
        await fetchEvent();
        setMembers([]);
        setStudents([]);
        return;
      }

      await Promise.all([fetchEvent(), fetchMembers(), fetchStudents()]);
    } catch (error) {
      console.error(error);
      showToast(
        getErrorMessage(error, "Etkinlik üye alanı yüklenirken hata oluştu."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!eventId) return;

    loadPage();
  }, [eventId]);

  const selectableStudents = useMemo(() => {
    if (isStudentRole) return [];

    return getSelectableStudents(students, members);
  }, [students, members, isStudentRole]);

  const filteredMembers = useMemo(() => {
    if (isStudentRole) return [];

    return filterEventMembers(members, search);
  }, [members, search, isStudentRole]);

  const handleBackToEvents = () => {
    navigate("/dashboard/events");
  };

  const handleOpenCreateModal = (modalId) => {
    if (isStudentRole) return;

    setFormData(emptyEventMemberForm);
    setErrors({});
    openModal(modalId);
  };

  const handleCloseCreateModal = (modalId) => {
    setFormData(emptyEventMemberForm);
    setErrors({});
    closeModal(modalId);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId) {
      newErrors.studentId = "Öğrenci seçiniz.";
    }

    if (Number(formData.paidAmount) < 0) {
      newErrors.paidAmount = "Ödenen tutar 0'dan küçük olamaz.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateMember = async (modalId) => {
    if (isStudentRole) return;

    if (!validateForm()) {
      showToast("Eksik veya hatalı alanlar var.", "error");
      return;
    }

    try {
      setSavingMember(true);

      await eventMemberService.create({
        eventId,
        studentId: formData.studentId,
        isPaid: formData.isPaid,
        paidAmount: Number(formData.paidAmount || 0),
      });

      await fetchMembers();
      handleCloseCreateModal(modalId);
      showToast("Öğrenci etkinliğe başarıyla eklendi.");
    } catch (error) {
      console.error(error);

      const message = getErrorMessage(
        error,
        "Öğrenci etkinliğe eklenirken hata oluştu."
      );

      setErrors({
        general: message,
      });

      showToast(message, "error");
    } finally {
      setSavingMember(false);
    }
  };

  const handleOpenDeleteModal = (memberId, modalId) => {
    if (isStudentRole) return;

    setDeletingMemberId(memberId);
    openModal(modalId);
  };

  const handleCloseDeleteModal = (modalId) => {
    setDeletingMemberId(null);
    closeModal(modalId);
  };

  const handleDeleteMember = async (modalId) => {
    if (isStudentRole) return;
    if (!deletingMemberId) return;

    try {
      await eventMemberService.delete(deletingMemberId);
      await fetchMembers();
      handleCloseDeleteModal(modalId);
      showToast("Öğrenci etkinlikten çıkarıldı.");
    } catch (error) {
      console.error(error);
      showToast(
        getErrorMessage(
          error,
          "Öğrenci etkinlikten çıkarılırken hata oluştu."
        ),
        "error"
      );
    }
  };

  const handleExportMembersPdf = () => {
    if (isStudentRole) return;

    exportToPdf({
      title: `${getEventName(event)} Etkinlik Katılımcı Listesi`,
      fileName: "etkinlik-katilimci-listesi.pdf",
      columns: eventMemberPdfColumns,
      data: members,
    });
  };

  return {
    event,
    members,
    filteredMembers,
    selectableStudents,
    formData,
    setFormData,
    errors,
    deletingMemberId,
    search,
    setSearch,
    loading,
    savingMember,
    toast,
    isStudentRole,
    canManageMembers: !isStudentRole,
    handleBackToEvents,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCreateMember,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMember,
    handleExportMembersPdf,
  };
}