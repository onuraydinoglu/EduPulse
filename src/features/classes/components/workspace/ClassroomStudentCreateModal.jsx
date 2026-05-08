import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import StudentForm from "../../../students/components/StudentForm";
import { getClassName } from "../../utils/classFormatters";

function ClassroomStudentCreateModal({
  classroom,
  classId,
  formData,
  setFormData,
  errors,
  saving,
  onClose,
  onSubmit,
}) {
  return (
    <Modal
      id="classroom_student_modal"
      title={`${getClassName(classroom)} Sınıfına Öğrenci Kaydı`}
      description="Bu ekrandan eklenen öğrenci otomatik olarak açık olan sınıfa atanır."
      footer={
        <>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={saving}
          >
            Vazgeç
          </button>

          <Button type="button" onClick={onSubmit} disabled={saving}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </>
      }
    >
      {errors.general && (
        <div className="mb-4 rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {errors.general}
        </div>
      )}

      <div className="mb-4 rounded-2xl border border-base-300/70 bg-base-200/60 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
          Seçili Sınıf
        </p>

        <p className="mt-1 text-sm font-semibold text-base-content">
          {getClassName(classroom)}
        </p>
      </div>

      <StudentForm
        formData={formData}
        setFormData={setFormData}
        classrooms={classroom ? [classroom] : []}
        errors={errors}
        isEditing={false}
        lockedClassroomId={classId}
        hideClassroomSelect
      />
    </Modal>
  );
}

export default ClassroomStudentCreateModal;