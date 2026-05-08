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
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errors.general}
        </div>
      )}

      <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        Seçili sınıf:{" "}
        <span className="font-semibold">{getClassName(classroom)}</span>
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