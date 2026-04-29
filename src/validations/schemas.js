import { validators } from "./validationRules";

export const loginValidationSchema = {
  email: [validators.required("E-posta zorunludur."), validators.email()],
  password: [validators.required("Şifre zorunludur.")],
};

export const registerSchoolValidationSchema = {
  schoolName: [
    validators.required("Okul adı zorunludur."),
    validators.minLength(2, "Okul adı en az 2 karakter olmalıdır."),
  ],
  city: [validators.required("Şehir zorunludur.")],
  district: [validators.required("İlçe zorunludur.")],
  address: [validators.required("Adres zorunludur.")],
  schoolPhoneNumber: [
    validators.required("Okul telefonu zorunludur."),
    validators.phone(),
  ],
  schoolEmail: [
    validators.required("Okul e-postası zorunludur."),
    validators.email(),
  ],
  adminFullName: [validators.required("Yönetici adı soyadı zorunludur.")],
  adminEmail: [
    validators.required("Yönetici e-postası zorunludur."),
    validators.email(),
  ],
  adminPassword: [
    validators.required("Yönetici şifresi zorunludur."),
    validators.minLength(6, "Şifre en az 6 karakter olmalıdır."),
  ],
};

export const schoolValidationSchema = {
  name: [validators.required("Okul adı zorunludur.")],
  city: [validators.required("Şehir zorunludur.")],
  district: [validators.required("İlçe zorunludur.")],
  address: [validators.required("Adres zorunludur.")],
  phoneNumber: [validators.required("Telefon zorunludur."), validators.phone()],
  email: [validators.email()],
};

export const userValidationSchema = {
  firstName: [validators.required("Ad zorunludur.")],
  lastName: [validators.required("Soyad zorunludur.")],
  email: [validators.required("E-posta zorunludur."), validators.email()],
  phoneNumber: [validators.required("Telefon zorunludur."), validators.phone()],
};

export const updateUserValidationSchema = {
  id: [validators.required("Kullanıcı Id bulunamadı.")],
  firstName: [validators.required("Ad zorunludur.")],
  lastName: [validators.required("Soyad zorunludur.")],
  email: [validators.required("E-posta zorunludur."), validators.email()],
  phoneNumber: [validators.required("Telefon zorunludur."), validators.phone()],
};

export const classroomValidationSchema = {
  grade: [validators.grade()],
  section: [validators.required("Şube zorunludur.")],
};

export const studentValidationSchema = {
  firstName: [validators.required("Ad zorunludur.")],
  lastName: [validators.required("Soyad zorunludur.")],
  schoolNumber: [validators.required("Okul numarası zorunludur.")],
  studentPhone: [
    validators.required("Öğrenci telefonu zorunludur."),
    validators.phone(),
  ],
  classroomId: [validators.required("Sınıf seçilmelidir.")],
};

export const lessonValidationSchema = {
  name: [
    validators.required("Ders adı zorunludur."),
    validators.minLength(2, "Ders adı en az 2 karakter olmalıdır."),
  ],
};
