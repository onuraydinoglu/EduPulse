import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  ChartBarIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

import Button from "../../../components/ui/Button";
import { authService } from "../services/authService";
import { authStorage } from "../services/authStorage";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return "E-posta alanı boş olamaz.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "Geçerli bir e-posta adresi giriniz.";
    }

    if (!formData.password.trim()) {
      return "Şifre alanı boş olamaz.";
    }

    return "";
  };

  const getErrorMessage = (error) => {
    if (error?.message) {
      return error.message;
    }

    const data = error?.response?.data;

    return (
      data?.message ||
      data?.Message ||
      data?.error ||
      data?.Error ||
      data?.errors?.[0] ||
      data?.Errors?.[0] ||
      data?.title ||
      "Giriş yapılırken bir hata oluştu."
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const user = response.data?.data || response.data;

      authStorage.setUser(user);
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="grid h-full lg:grid-cols-[0.9fr_1.1fr]">
        {/* SOL LOGIN */}
        <section className="flex h-full items-center justify-center px-6">
          <div className="w-full max-w-xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/80">
              {/* HEADER */}
              <div className="mb-10">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Giriş Yap
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Okul yönetimini tek panelde topla. Öğrenci, öğretmen ve tüm
                  süreçleri hızlı ve düzenli şekilde yönet.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    E-posta
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                    />

                    <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Şifre
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Şifrenizi girin"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="input input-bordered w-full rounded-xl border-slate-200 bg-white pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                    />

                    <LockClosedIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                    {error}
                  </div>
                )}

                {/* OPTIONS */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium">Beni hatırla</span>
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-indigo-500 transition-colors hover:text-indigo-600"
                  >
                    Şifremi unuttum
                  </button>
                </div>

                {/* BUTTON */}
                <Button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 text-base font-bold text-white shadow-lg hover:from-indigo-700 hover:to-sky-600"
                  disabled={loading}
                >
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>

              {/* ALT YAZI */}
              <div className="mt-6 text-center text-sm text-slate-500">
                Hesabın yok mu?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  Kayıt ol
                </Link>
              </div>

              <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
                Devam ederek{" "}
                <span className="cursor-pointer font-medium text-indigo-600 hover:underline">
                  Kullanım Koşulları
                </span>{" "}
                ve{" "}
                <span className="cursor-pointer font-medium text-indigo-600 hover:underline">
                  Gizlilik Politikası
                </span>
                ’nı kabul etmiş olursun.
              </p>
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
                <h2 className="text-xl font-black">EduPulse</h2>
                <p className="text-xs text-white/70">Okul Yönetim Sistemi</p>
              </div>
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold ring-1 ring-white/20 backdrop-blur">
              <SparklesIcon className="h-4 w-4" />
              Yeni nesil okul takip sistemi
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-2xl">
            <h3 className="max-w-xl text-3xl font-black leading-tight tracking-tight">
              Okul süreçlerini tek ekrandan yönetin.
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20 backdrop-blur">
                <UsersIcon className="mb-3 h-6 w-6" />
                <h4 className="font-black">Kullanıcı Yönetimi</h4>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  Okul yöneticisi, öğretmen, veli ve öğrenci süreçleri.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20 backdrop-blur">
                <ClipboardDocumentCheckIcon className="mb-3 h-6 w-6" />
                <h4 className="font-black">Akademik Takip</h4>
                <p className="mt-1 text-xs leading-5 text-white/70">
                  Not, sınav, sınıf ve performans kayıtları.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.7rem] border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.3rem] bg-white p-5 text-slate-900 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400">
                      Genel Durum
                    </p>
                    <h3 className="text-lg font-black">EduPulse Dashboard</h3>
                  </div>

                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    Aktif
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-indigo-50 p-4">
                    <UsersIcon className="mb-2 h-5 w-5 text-indigo-600" />
                    <p className="text-xl font-black">428</p>
                    <p className="text-xs font-bold text-slate-500">Öğrenci</p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-4">
                    <BuildingOfficeIcon className="mb-2 h-5 w-5 text-sky-600" />
                    <p className="text-xl font-black">18</p>
                    <p className="text-xs font-bold text-slate-500">Sınıf</p>
                  </div>

                  <div className="rounded-2xl bg-violet-50 p-4">
                    <ChartBarIcon className="mb-2 h-5 w-5 text-violet-600" />
                    <p className="text-xl font-black">92%</p>
                    <p className="text-xs font-bold text-slate-500">Başarı</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-black">Haftalık Rapor</p>
                    <p className="text-xs font-black text-indigo-600">
                      Güncel
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-xs font-bold">
                        <span>Ders Performansı</span>
                        <span>84%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 w-[84%] rounded-full bg-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between text-xs font-bold">
                        <span>Devam Takibi</span>
                        <span>91%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div className="h-2 w-[91%] rounded-full bg-sky-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default LoginPage;