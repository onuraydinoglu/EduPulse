import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import { authService } from "../services/authService";
import { authStorage } from "../services/authStorage";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
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
      "Giriş yapılırken bir hata oluştu."
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await authService.login(formData);

      if (result?.isSuccess === false) {
        setError(result.message || "E-posta veya şifre hatalı.");
        return;
      }

      const user = result?.data || result;

      authStorage.setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold text-primary">
            EduPulse
          </h1>

          <p className="text-center text-sm text-base-content/60">
            Yönetim paneline giriş yap
          </p>

          {error && (
            <div className="alert alert-error mt-4 rounded-xl">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">E-posta</span>
              </label>

              <div className="relative">
                <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                <input
                  type="email"
                  className="input input-bordered w-full rounded-xl pl-12"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="admin@edupulse.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Şifre</span>
              </label>

              <div className="relative">
                <LockClosedIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />

                <input
                  type="password"
                  className="input input-bordered w-full rounded-xl pl-12"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/register-school")}
              className="font-semibold text-primary hover:underline"
            >
              Okul hesabı oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;