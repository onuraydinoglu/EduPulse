import { useEffect, useState } from "react";
import { personalNoteService } from "../services/personalNoteService";
import { emptyPersonalNoteForm } from "../constants/personalNoteConstants";
import {
    getPersonalNoteContent,
    getPersonalNoteId,
    getPersonalNoteIsActive,
    getPersonalNoteTitle,
    sortPersonalNotesByCreatedDateDesc,
} from "../utils/personalNoteFormatters";

export function usePersonalNotes(showToast) {
    const [notes, setNotes] = useState([]);
    const [noteForm, setNoteForm] = useState(emptyPersonalNoteForm);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [deletingNoteId, setDeletingNoteId] = useState(null);
    const [noteLoading, setNoteLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const isEditingNote = editingNoteId !== null;

    const openModal = (id) => {
        document.getElementById(id)?.showModal();
    };

    const closeModal = (id) => {
        document.getElementById(id)?.close();
    };

    const loadNotes = async () => {
        try {
            const data = await personalNoteService.getAll();
            setNotes(sortPersonalNotesByCreatedDateDesc(data));
        } catch (error) {
            showToast?.(error.message || "Notlar yüklenirken hata oluştu.", "error");
            setNotes([]);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadInitialNotes = async () => {
            try {
                const data = await personalNoteService.getAll();

                if (!isMounted) return;

                setNotes(sortPersonalNotesByCreatedDateDesc(data));
            } catch (error) {
                if (!isMounted) return;

                showToast?.(
                    error.message || "Notlar yüklenirken hata oluştu.",
                    "error",
                );

                setNotes([]);
            } finally {
                if (isMounted) {
                    setNoteLoading(false);
                }
            }
        };

        loadInitialNotes();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (field, value) => {
        setNoteForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateNoteForm = () => {
        const nextErrors = {};

        if (!noteForm.title.trim()) {
            nextErrors.title = "Not başlığı boş olamaz.";
        }

        if (noteForm.title.trim().length > 100) {
            nextErrors.title = "Not başlığı en fazla 100 karakter olabilir.";
        }

        if (!noteForm.content.trim()) {
            nextErrors.content = "Not içeriği boş olamaz.";
        }

        if (noteForm.content.trim().length > 2000) {
            nextErrors.content = "Not içeriği en fazla 2000 karakter olabilir.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleOpenNoteModal = (modalId) => {
        setEditingNoteId(null);
        setNoteForm(emptyPersonalNoteForm);
        setErrors({});
        openModal(modalId);
    };

    const handleCloseNoteModal = (modalId) => {
        closeModal(modalId);
        setEditingNoteId(null);
        setNoteForm(emptyPersonalNoteForm);
        setErrors({});
    };

    const handleEditNote = (note, modalId) => {
        setEditingNoteId(getPersonalNoteId(note));

        setNoteForm({
            title: getPersonalNoteTitle(note),
            content: getPersonalNoteContent(note),
            isActive: getPersonalNoteIsActive(note),
        });

        setErrors({});
        openModal(modalId);
    };

    const handleSaveNote = async (modalId) => {
        if (!validateNoteForm()) return;

        try {
            if (isEditingNote) {
                await personalNoteService.update({
                    id: editingNoteId,
                    title: noteForm.title,
                    content: noteForm.content,
                    isActive: noteForm.isActive,
                });

                showToast?.("Not başarıyla güncellendi.");
            } else {
                await personalNoteService.create({
                    title: noteForm.title,
                    content: noteForm.content,
                });

                showToast?.("Not başarıyla oluşturuldu.");
            }

            handleCloseNoteModal(modalId);
            await loadNotes();
        } catch (error) {
            showToast?.(
                error.message || "Not işlemi sırasında hata oluştu.",
                "error",
            );
        }
    };

    const handleOpenNoteDeleteModal = (id, modalId) => {
        setDeletingNoteId(id);
        openModal(modalId);
    };

    const handleCloseNoteDeleteModal = (modalId) => {
        setDeletingNoteId(null);
        closeModal(modalId);
    };

    const handleDeleteNote = async (modalId) => {
        if (!deletingNoteId) return;

        try {
            await personalNoteService.delete(deletingNoteId);

            showToast?.("Not başarıyla silindi.");

            handleCloseNoteDeleteModal(modalId);
            await loadNotes();
        } catch (error) {
            showToast?.(error.message || "Not silinirken hata oluştu.", "error");
        }
    };

    return {
        notes,
        noteForm,
        noteLoading,
        errors,
        isEditingNote,
        handleChange,
        handleOpenNoteModal,
        handleCloseNoteModal,
        handleEditNote,
        handleSaveNote,
        handleOpenNoteDeleteModal,
        handleDeleteNote,
    };
}