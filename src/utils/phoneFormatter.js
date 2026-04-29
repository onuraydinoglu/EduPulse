export const formatPhone = (value) => {
  if (!value) return "";

  // sadece rakam
  let digits = value.replace(/\D/g, "");

  // başına 0 koy
  if (!digits.startsWith("0")) {
    digits = "0" + digits;
  }

  // max 11 hane
  digits = digits.slice(0, 11);

  // format: 0545 555 55 55
  const parts = [
    digits.slice(0, 4),
    digits.slice(4, 7),
    digits.slice(7, 9),
    digits.slice(9, 11),
  ].filter(Boolean);

  return parts.join(" ");
};

export const cleanPhone = (value) => {
  return value.replace(/\D/g, "");
};
