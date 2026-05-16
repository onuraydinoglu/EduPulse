import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import ActiveCheckbox from "../ui/ActiveCheckbox";
import { formatPhone } from "../../utils/phoneFormatter";

function FormFields({
  fields = [],
  formData = {},
  setFormData,
  errors = {},
  isEditing = false,
  showActiveCheckbox = true,
}) {
  const updateField = (field, value) => {
    if (!field?.name || !setFormData) return;

    let finalValue = value;

    if (field.name === "phoneNumber") {
      finalValue = formatPhone(value);
    }

    if (field.transform) {
      finalValue = field.transform(finalValue);
    }

    setFormData((prev) => ({
      ...(prev || {}),
      [field.name]: finalValue,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => {
        if (!field?.name) return null;

        const fieldValue = formData?.[field.name] ?? "";

        if (field.type === "select") {
          return (
            <FormSelect
              key={field.name}
              label={field.label}
              value={formData[field.name] || ""}
              onChange={(value) => updateField(field, value)}
              options={field.options || []}
              error={errors[field.name]}
              className={field.className}
              disabled={field.disabled}
              placeholder={field.placeholder}
            />
          );
        }

        return (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(value) => updateField(field, value)}
            error={errors?.[field.name]}
            className={field.className}
            disabled={field.disabled}
            maxLength={field.maxLength}
          />
        );
      })}

      {isEditing && showActiveCheckbox && (
        <ActiveCheckbox
          className="md:col-span-2"
          checked={formData?.isActive !== false && formData?.isActive !== "false"}
          onChange={(value) =>
            setFormData?.((prev) => ({
              ...(prev || {}),
              isActive: value,
            }))
          }
        />
      )}
    </div>
  );
}

export default FormFields;