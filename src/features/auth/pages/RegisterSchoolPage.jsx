import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import { authService } from "../services/authService";

const initialFormData = {
  schoolName: "",
  city: "",
  district: "",
  address: "",
  schoolPhoneNumber: "",
  schoolEmail: "",
  adminFullName: "",
  adminEmail: "",
  adminPassword: "",
};

function RegisterSchoolPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getErrorMessage = (err) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.Message ||
      err?.response?.data?.error ||
      "Okul kaydı oluşturulurken hata oluştu."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const result = await authService.registerSchool(formData);

      if (result?.isSuccess === false) {
        setError(result.message || "Okul kaydı oluşturulamadı.");
        return;
      }

      setSuccessMessage("Okul kaydı başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz.");
      setFormData(initialFormData);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-base-100 shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden bg-gradient-to-br from-primary to-secondary p-10 text-primary-content lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <AcademicCapIcon className="h-8 w-8" />
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                EduPulse okul kayıt paneli
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-primary-content/80">
                Okul hesabınızı oluşturun, yönetici kullanıcınızı tanımlayın ve
                sistemi kullanmaya başlayın.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-primary-content/80">
                Bu kayıt ekranı okul bilgileri ile birlikte ilk admin
                kullanıcısını oluşturur.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold text-primary">Yeni kayıt</p>
              <h2 className="mt-2 text-3xl font-bold text-base-content">
                Okul hesabı oluştur
              </h2>
              <p className="mt-2 text-sm text-base-content/60">
                Sisteme giriş yapacak admin bilgilerini de bu alanda tanımlayın.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm font-medium text-error">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-5 rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <section>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-base-content/60">
                  Okul Bilgileri
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Okul Adı"
                    icon={BuildingLibraryIcon}
                    value={formData.schoolName}
                    onChange={(value) => updateField("schoolName", value)}
                    placeholder="Atatürk Anadolu Lisesi"
                  />

                  <InputField
                    label="Okul E-posta"
                    icon={EnvelopeIcon}
                    type="email"
                    value={formData.schoolEmail}
                    onChange={(value) => updateField("schoolEmail", value)}
                    placeholder="okul@edupulse.com"
                  />

                  <InputField
                    label="Şehir"
                    icon={MapPinIcon}
                    value={formData.city}
                    onChange={(value) => updateField("city", value)}
                    placeholder="Samsun"
                  />

                  <InputField
                    label="İlçe"
                    icon={MapPinIcon}
                    value={formData.district}
                    onChange={(value) => updateField("district", value)}
                    placeholder="Atakum"
                  />

                  <InputField
                    label="Okul Telefon"
                    icon={PhoneIcon}
                    value={formData.schoolPhoneNumber}
                    onChange={(value) =>
                      updateField("schoolPhoneNumber", value)
                    }
                    placeholder="0362 000 00 00"
                  />

                  <InputField
                    label="Adres"
                    icon={MapPinIcon}
                    value={formData.address}
                    onChange={(value) => updateField("address", value)}
                    placeholder="Mahalle, cadde, sokak"
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-base-content/60">
                  Admin Bilgileri
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Admin Ad Soyad"
                    icon={UserIcon}
                    value={formData.adminFullName}
                    onChange={(value) => updateField("adminFullName", value)}
                    placeholder="Ahmet Yılmaz"
                  />

                  <InputField
                    label="Admin E-posta"
                    icon={EnvelopeIcon}
                    type="email"
                    value={formData.adminEmail}
                    onChange={(value) => updateField("adminEmail", value)}
                    placeholder="admin@edupulse.com"
                  />

                  <InputField
                    label="Admin Şifre"
                    icon={LockClosedIcon}
                    type="password"
                    value={formData.adminPassword}
                    onChange={(value) => updateField("adminPassword", value)}
                    placeholder="••••••••"
                  />
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm font-semibold text-base-content/60 hover:text-primary"
                >
                  Zaten hesabın var mı? Giriş yap
                </button>

                <Button type="submit" disabled={loading}>
                  {loading ? "Kaydediliyor..." : "Okul Kaydı Oluştur"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <label className="form-control w-full">
      <span className="label-text mb-2 font-semibold text-base-content/70">
        {label}
      </span>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="input input-bordered w-full rounded-2xl pl-12"
        />
      </div>
    </label>
  );
}

export default RegisterSchoolPage;