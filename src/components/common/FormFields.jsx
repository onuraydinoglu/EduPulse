import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";

function FormFields({ fields = [], formData, setFormData }) {
  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
              onChange={(value) => updateField(field.name, value)}
              options={field.options || []}
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
            onChange={(value) => updateField(field.name, value)}
          />
        );
      })}
    </div>
  );
}

export default FormFields;