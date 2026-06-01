import Toast from "../../../components/ui/Toast";

import ClassDeleteModal from "../components/ClassDeleteModal";
import ClassFormModal from "../components/ClassFormModal";
import ClassesPageHeader from "../components/ClassesPageHeader";
import ClassStatsCards from "../components/ClassStatsCards";
import ClassTable from "../components/ClassTable";

import {
  CLASS_DELETE_MODAL_ID,
  CLASS_MODAL_ID,
} from "../constants/classConstants";

import { getClassStats } from "../constants/classTableColumns";
import { useClassesPage } from "../hooks/useClassesPage";
import { getCurrentRole } from "../../../utils/authUser";

function ClassesPage() {
  const {
    classes,
    filteredClasses,
    teachers,

    formData,
    setFormData,
    errors,
    isEditing,

    toast,

    search,
    setSearch,
    gradeFilter,
    setGradeFilter,

    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseClassModal,
    handleOpenDeleteModal,
    handleDelete,
    handleSubmit,
    handleExportClassesPdf,
  } = useClassesPage();

  const currentRole = getCurrentRole();

  const canManageClasses =
    currentRole === "schooladmin" || currentRole === "officer";

  return (
    <div className="space-y-6">
      <Toast message={toast.message} type={toast.type} />

      <ClassesPageHeader
        canManage={canManageClasses}
        onCreate={() => handleOpenCreateModal(CLASS_MODAL_ID)}
        onExport={handleExportClassesPdf}
      />

      <ClassStatsCards items={getClassStats(classes)} />

      <ClassTable
        classes={filteredClasses}
        teachers={teachers}
        search={search}
        setSearch={setSearch}
        gradeFilter={gradeFilter}
        setGradeFilter={setGradeFilter}
        canManage={canManageClasses}
        onEdit={(classItem) => handleOpenEditModal(classItem, CLASS_MODAL_ID)}
        onDelete={(id) => handleOpenDeleteModal(id, CLASS_DELETE_MODAL_ID)}
      />

      {canManageClasses && (
        <>
          <ClassFormModal
            modalId={CLASS_MODAL_ID}
            teachers={teachers}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            isEditing={isEditing}
            onClose={() => handleCloseClassModal(CLASS_MODAL_ID)}
            onSubmit={() => handleSubmit(CLASS_MODAL_ID)}
          />

          <ClassDeleteModal
            modalId={CLASS_DELETE_MODAL_ID}
            onConfirm={() => handleDelete(CLASS_DELETE_MODAL_ID)}
          />
        </>
      )}
    </div>
  );
}

export default ClassesPage;
