import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { formatPhone } from "../../utils/phoneFormatter";

function FormFields({ fields = [], formData, setFormData, errors = {} }) {
  const updateField = (field, value) => {
    let finalValue = value;

    if (field.name === "phoneNumber") {
      finalValue = formatPhone(value);
    }

    if (field.transform) {
      finalValue = field.transform(finalValue);
    }

    setFormData((prev) => ({
      ...prev,
      [field.name]: finalValue,
    }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => {
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
            />
          );
        }

        return (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(value) => updateField(field, value)}
            error={errors[field.name]}
            className={field.className}
          />
        );
      })}
    </div>
  );
}

export default FormFields;