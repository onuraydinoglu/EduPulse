const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
  required:
    (message = "Bu alan zorunludur.") =>
    (value) => {
      if (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
      ) {
        return message;
      }

      return "";
    },

  email:
    (message = "Geçerli bir e-posta adresi giriniz.") =>
    (value) => {
      if (!value) return "";

      return emailRegex.test(String(value).trim()) ? "" : message;
    },

  phone:
    (message = "Telefon 0 ile başlamalı ve 11 haneli olmalıdır.") =>
    (value) => {
      if (!value) return "";

      const digits = String(value).replace(/\D/g, "");

      if (!digits.startsWith("0")) {
        return "Telefon 0 ile başlamalıdır.";
      }

      if (digits.length !== 11) {
        return message;
      }

      return "";
    },

  minLength: (length, message) => (value) => {
    if (!value) return "";

    return String(value).trim().length >= length
      ? ""
      : message || `En az ${length} karakter giriniz.`;
  },

  grade: () => (value) => {
    const numberValue = Number(value);

    if (!value && value !== 0) return "Sınıf seviyesi zorunludur.";
    if (Number.isNaN(numberValue)) return "Sınıf seviyesi sayı olmalıdır.";
    if (numberValue < 1 || numberValue > 12) {
      return "Sınıf seviyesi 1 ile 12 arasında olmalıdır.";
    }

    return "";
  },
};

export const validateForm = (formData, schema) => {
  const errors = {};

  Object.entries(schema).forEach(([field, rules]) => {
    for (const rule of rules) {
      const error = rule(formData[field]);

      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};

export const hasValidationError = (errors) => {
  return Object.keys(errors).length > 0;
};
