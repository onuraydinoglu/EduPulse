import Button from "../../../components/ui/Button";
import FormSelect from "../../../components/ui/FormSelect";

import { getStudentSelectOptions } from "../utils/clubMemberFormatters";

function ClubMemberFormModal({
  modalId,
  formData,
  setFormData,
  selectableStudents = [],
  errors = {},
  saving = false,
  onClose,
  onSubmit,
}) {
  const studentOptions = [
    {
      label: "Öğrenci seçiniz",
      value: "",
    },
    ...getStudentSelectOptions(selectableStudents),
  ];

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-2xl rounded-3xl border border-base-300 bg-base-100 p-0 shadow-2xl">
        <div className="border-b border-base-300 px-6 py-5">
          <h3 className="text-xl font-bold text-base-content">
            Kulübe Öğrenci Ekle
          </h3>

          <p className="mt-1 text-sm text-base-content/60">
            Aktif öğrenciler arasından kulübe eklenecek öğrenciyi seçin.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          {errors.general && (
            <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
              {errors.general}
            </div>
          )}

          <FormSelect
            label="Öğrenci"
            value={formData.studentId}
            options={studentOptions}
            error={errors.studentId}
            onChange={(value) =>
              setFormData((previous) => ({
                ...previous,
                studentId: value,
              }))
            }
          />

          {selectableStudents.length === 0 && (
            <div className="rounded-2xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning-content">
              Eklenebilir aktif öğrenci bulunamadı veya tüm öğrenciler bu kulübe
              eklenmiş.
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-base-300 px-6 py-4">
          <Button variant="ghost" onClick={onClose}>
            Vazgeç
          </Button>

          <Button
            onClick={onSubmit}
            disabled={saving || selectableStudents.length === 0}
          >
            {saving ? "Ekleniyor..." : "Ekle"}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default ClubMemberFormModal;
