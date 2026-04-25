import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { staticUsers } from "../../../data/staticUsers";
import { authStorage } from "../services/authStorage";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "admin@okulpro.com",
    password: "123456",
  });

  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = staticUsers.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!foundUser) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    const { password, ...safeUser } = foundUser;

    authStorage.setUser(safeUser);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold text-primary">
            OkulPro
          </h1>

          <p className="text-center text-sm text-base-content/60">
            Role göre statik giriş ekranı
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
              <input
                type="email"
                className="input input-bordered w-full rounded-xl"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Şifre</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full rounded-xl"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-full rounded-xl">
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-base-200 p-4 text-sm">
            <p className="font-semibold">Test Kullanıcıları</p>
            <p>Admin: admin@okulpro.com / 123456</p>
            <p>Müdür: mudur@okulpro.com / 123456</p>
            <p>Öğretmen: ogretmen@okulpro.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;