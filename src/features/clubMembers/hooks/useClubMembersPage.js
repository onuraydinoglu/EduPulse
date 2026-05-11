import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../../../api/axiosInstance";
import { API_ENDPOINTS } from "../../../api/endpoints";
import { exportToPdf } from "../../../utils/exportToPdf";

import { clubService } from "../../clubs/services/clubService";
import { clubMemberService } from "../services/clubMemberService";

import { emptyClubMemberForm } from "../constants/clubMemberConstants";
import { clubMemberPdfColumns } from "../constants/clubMemberTableColumns";

import {
    filterClubMembers,
    getData,
    getErrorMessage,
    getSelectableStudents,
} from "../utils/clubMemberFormatters";

export function useClubMembersPage() {
    const { clubId } = useParams();
    const navigate = useNavigate();

    const [club, setClub] = useState(null);
    const [members, setMembers] = useState([]);
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState(emptyClubMemberForm);
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

    const fetchClub = async () => {
        const result = await clubService.getById(clubId);
        const data = result?.data || result?.Data || result;

        setClub(data || null);
    };

    const fetchMembers = async () => {
        const data = await clubMemberService.getByClubId(clubId);
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

            await Promise.all([fetchClub(), fetchMembers(), fetchStudents()]);
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(error, "Kulüp üye alanı yüklenirken hata oluştu."),
                "error",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!clubId) return;

        loadPage();
    }, [clubId]);

    const selectableStudents = useMemo(() => {
        return getSelectableStudents(students, members);
    }, [students, members]);

    const filteredMembers = useMemo(() => {
        return filterClubMembers(members, search);
    }, [members, search]);

    const handleBackToClubs = () => {
        navigate("/dashboard/clubs");
    };

    const handleOpenCreateModal = (modalId) => {
        setFormData(emptyClubMemberForm);
        setErrors({});
        openModal(modalId);
    };

    const handleCloseCreateModal = (modalId) => {
        setFormData(emptyClubMemberForm);
        setErrors({});
        closeModal(modalId);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentId) {
            newErrors.studentId = "Öğrenci seçiniz.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCreateMember = async (modalId) => {
        if (!validateForm()) {
            showToast("Eksik veya hatalı alanlar var.", "error");
            return;
        }

        try {
            setSavingMember(true);

            await clubMemberService.create({
                clubId,
                studentId: formData.studentId,
            });

            await fetchMembers();

            handleCloseCreateModal(modalId);
            showToast("Öğrenci kulübe başarıyla eklendi.");
        } catch (error) {
            console.error(error);

            const message = getErrorMessage(
                error,
                "Öğrenci kulübe eklenirken hata oluştu.",
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
        setDeletingMemberId(memberId);
        openModal(modalId);
    };

    const handleCloseDeleteModal = (modalId) => {
        setDeletingMemberId(null);
        closeModal(modalId);
    };

    const handleDeleteMember = async (modalId) => {
        if (!deletingMemberId) return;

        try {
            await clubMemberService.delete(deletingMemberId);

            await fetchMembers();

            handleCloseDeleteModal(modalId);
            showToast("Öğrenci kulüpten çıkarıldı.");
        } catch (error) {
            console.error(error);

            showToast(
                getErrorMessage(error, "Öğrenci kulüpten çıkarılırken hata oluştu."),
                "error",
            );
        }
    };

    const handleExportMembersPdf = () => {
        exportToPdf({
            title: "Kulüp Üye Listesi",
            fileName: "kulup-uye-listesi.pdf",
            columns: clubMemberPdfColumns,
            data: members,
        });
    };

    return {
        club,
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

        handleBackToClubs,

        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateMember,

        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleDeleteMember,

        handleExportMembersPdf,
    };
}