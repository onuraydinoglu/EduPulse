import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import MultiSelectDropdown from "../../../components/ui/MultiSelectDropdown";
import {
  getUserFullName,
  getUserId,
  getUserRoleName,
} from "../utils/messageFormatters";

const CLASSROOM_TARGET_PREFIX = "classroom:";

const isClassroomTarget = (user) => {
  const userId = getUserId(user);
  const roleName = getUserRoleName(user);

  return (
    userId?.startsWith(CLASSROOM_TARGET_PREFIX) ||
    roleName?.toLowerCase() === "sınıf"
  );
};

const getClassroomGrade = (classroomName) => {
  const grade = parseInt(classroomName?.split("-")[0], 10);

  return Number.isNaN(grade) ? 999 : grade;
};

const getClassroomSection = (classroomName) => {
  return classroomName?.split("-")[1]?.trim() || "";
};

function MessageCreateModal({
  id,
  users,
  formData,
  submitLoading,
  onChange,
  onClose,
  onSubmit,
}) {
  const personOptions = users
    .filter((user) => !isClassroomTarget(user))
    .map((user) => {
      const userId = getUserId(user);
      const fullName = getUserFullName(user);
      const roleName = getUserRoleName(user);

      return {
        value: userId,
        label: `${fullName} - ${roleName}`,
      };
    })
    .sort((first, second) => first.label.localeCompare(second.label, "tr"));

  const classroomOptions = users
    .filter((user) => isClassroomTarget(user))
    .map((user) => {
      const userId = getUserId(user);
      const fullName = getUserFullName(user);

      return {
        value: userId,
        label: fullName,
      };
    })
    .sort((first, second) => {
      const firstGrade = getClassroomGrade(first.label);
      const secondGrade = getClassroomGrade(second.label);

      if (firstGrade !== secondGrade) {
        return firstGrade - secondGrade;
      }

      return getClassroomSection(first.label).localeCompare(
        getClassroomSection(second.label),
        "tr",
      );
    });

  const selectedPersonIds = formData.receiverUserIds.filter((receiverUserId) =>
    personOptions.some((option) => option.value === receiverUserId),
  );

  const selectedClassroomIds = formData.receiverUserIds.filter(
    (receiverUserId) =>
      classroomOptions.some((option) => option.value === receiverUserId),
  );

  const handlePersonChange = (selectedValues) => {
    onChange("receiverUserIds", [...selectedValues, ...selectedClassroomIds]);
  };

  const handleClassroomChange = (selectedValues) => {
    onChange("receiverUserIds", [...selectedPersonIds, ...selectedValues]);
  };

  return (
    <Modal
      id={id}
      title="Yeni Mesaj"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            disabled={submitLoading}
            onClick={onClose}
          >
            Vazgeç
          </Button>

          <Button
            type="button"
            variant="primary"
            disabled={submitLoading}
            onClick={onSubmit}
          >
            {submitLoading ? "Gönderiliyor..." : "Gönder"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MultiSelectDropdown
            label="Kişilere Mesaj"
            value={selectedPersonIds}
            onChange={handlePersonChange}
            options={personOptions}
            placeholder="Kişi seçiniz"
            emptyText="Kişi bulunamadı"
          />

          <MultiSelectDropdown
            label="Sınıflara Mesaj"
            value={selectedClassroomIds}
            onChange={handleClassroomChange}
            options={classroomOptions}
            placeholder="Sınıf seçiniz"
            emptyText="Sınıf bulunamadı"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Başlık
          </label>

          <input
            value={formData.title}
            onChange={(event) => onChange("title", event.target.value)}
            maxLength={200}
            placeholder="Örn: Toplantı Bilgisi"
            className="h-11 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mesaj
          </label>

          <textarea
            value={formData.content}
            onChange={(event) => onChange("content", event.target.value)}
            rows="5"
            maxLength={1000}
            placeholder="Mesajınızı yazın..."
            className="w-full resize-none rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
        </div>
      </div>
    </Modal>
  );
}

export default MessageCreateModal;
