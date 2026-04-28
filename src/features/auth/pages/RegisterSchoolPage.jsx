import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import { authService } from "../services/authService";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  schoolCode: "",
};

function RegisterPage() {
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
    const data = err?.response?.data;

    console.log("REGISTER ERROR:", data);

    if (!data) return "Sunucuya ulaşılamadı.";
    if (typeof data === "string") return data;
    if (data.message) return data.message;
    if (data.Message) return data.Message;
    if (data.error) return data.error;

    if (data.errors) {
      if (Array.isArray(data.errors)) return data.errors.join(" ");
      if (typeof data.errors === "object") {
        return Object.values(data.errors).flat().join(" ");
      }
    }

    if (data.title) return data.title;

    return "Kayıt oluşturulurken hata oluştu.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const result = await authService.register(formData);

      if (result?.isSuccess === false) {
        setError(result.message || "Kayıt oluşturulamadı.");
        return;
      }

      setSuccessMessage(
        "Müdür hesabı başarıyla oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz."
      );

      setFormData(initialFormData);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.log("FULL ERROR:", err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
        {/* SOL FORM */}
        <section className="flex h-full items-center justify-center px-6 py-8">
          <div className="w-full max-w-2xl">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Giriş sayfasına dön
            </button>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/80">
              <div className="mb-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Yeni kayıt
                </p>

                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Müdür hesabı oluştur
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  Okulunuza ait okul kodu ile EduPulse yönetim paneline erişim
                  sağlayacak hesabınızı oluşturun.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OKUL KODU */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Okul Kodu
                  </label>

                  <div className="flex items-center gap-4">
                    {/* EDU */}
                    <span className="text-lg font-bold tracking-widest text-indigo-600">
                      EDU-
                    </span>

                    {/* KUTULAR */}
                    <div className="flex gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          maxLength={1}
                          inputMode="numeric"
                          value={formData.schoolCode[index] || ""}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (!value) return;

                            const newCode = formData.schoolCode.split("");
                            newCode[index] = value;
                            updateField("schoolCode", newCode.join(""));

                            const next = document.getElementById(`code-${index + 1}`);
                            if (next) next.focus();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              const newCode = formData.schoolCode.split("");
                              newCode[index] = "";
                              updateField("schoolCode", newCode.join(""));

                              const prev = document.getElementById(`code-${index - 1}`);
                              if (prev) prev.focus();
                            }
                          }}
                          className="h-12 w-12 rounded-xl border border-slate-200 text-center text-lg font-semibold text-slate-900 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* AD */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Ad
                    </label>

                    <div className="relative">
                      <UserIcon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        placeholder="Mehmet"
                        required
                        className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* SOYAD */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Soyad
                    </label>

                    <div className="relative">
                      <UserIcon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        placeholder="Demir"
                        required
                        className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* E-POSTA */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      E-posta
                    </label>

                    <div className="relative">
                      <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="mehmet.demir@test.com"
                        required
                        className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* TELEFON */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Telefon
                    </label>

                    <div className="relative">
                      <PhoneIcon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => updateField("phoneNumber", e.target.value)}
                        placeholder="05555555555"
                        required
                        className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* ŞİFRE */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Şifre
                    </label>

                    <div className="relative">
                      <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="Şifrenizi girin"
                        required
                        className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-sky-600"
                >
                  {loading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
                </Button>

                <div className="text-center text-sm text-slate-500">
                  Zaten hesabın var mı?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-700 hover:underline"
                  >
                    Giriş yap
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SAĞ TANITIM */}
        <section className="relative hidden h-full overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-600 to-sky-500 px-12 py-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
                <AcademicCapIcon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-black">EduPulse</h1>
                <p className="text-xs text-white/70">Okul Yönetim Sistemi</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold ring-1 ring-white/20 backdrop-blur">
              <SparklesIcon className="h-4 w-4" />
              Güvenli kayıt
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Okul yönetimine ilk adımı at.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              EduPulse ile okul kullanıcılarını, sınıfları, öğrencileri ve
              raporları tek bir modern panel üzerinden yönetmeye başlayın.
            </p>

            <div className="mt-8 space-y-4">
              <FeatureItem
                icon={ShieldCheckIcon}
                title="Okul kodu ile güvenli kayıt"
                description="Kayıt işlemi yalnızca geçerli okul kodu ile tamamlanır."
              />

              <FeatureItem
                icon={CheckCircleIcon}
                title="Müdür hesabı oluşturma"
                description="Okul yöneticisi hesabı oluşturulduktan sonra panele giriş yapılabilir."
              />

              <FeatureItem
                icon={AcademicCapIcon}
                title="Tek panelden yönetim"
                description="Öğretmen, öğrenci, veli ve akademik takip süreçleri aynı sistemde toplanır."
              />
            </div>

            <div className="mt-8 rounded-[1.7rem] border border-white/20 bg-white/15 p-5 shadow-2xl backdrop-blur-xl">
              <p className="text-sm font-semibold text-white/90">
                Başlamadan önce
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Okul kodunuz yoksa sistem yöneticinizden okul kaydınızın
                oluşturulmasını isteyin.
              </p>
            </div>
          </div>


          <div className="relative z-10 flex items-center justify-end text-xs font-semibold text-white/65">
            <span>© 2026 EduPulse</span>
          </div>
        </section>
      </div>
    </div>
  );
}



function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/15 p-4 ring-1 ring-white/20 backdrop-blur">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-white/70">{description}</p>
      </div>
    </div>
  );
}

export default RegisterPage;