import { useNavigate } from "react-router-dom";
import { authStorage } from "../../features/auth/services/authStorage";

function Navbar() {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const initials = user?.fullName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    authStorage.removeUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
      <div className="navbar px-4 lg:px-6">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost rounded-xl"
          >
            ☰
          </label>
        </div>

        <div className="flex-1">
          <div>
            <h2 className="text-lg font-semibold">Yönetim Paneli</h2>
            <p className="text-xs text-base-content/50">
              Akademik süreçleri tek ekrandan yönetin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-circle">🔔</button>

          <div className="dropdown dropdown-end">
            <button className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-base-200">
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-primary text-primary-content">
                  <span className="text-sm font-bold">
                    {initials || "U"}
                  </span>
                </div>
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold">
                  {user?.fullName || "Kullanıcı"}
                </p>
                <p className="text-xs capitalize text-base-content/50">
                  {user?.role || "Rol yok"}
                </p>
              </div>
            </button>

            <ul className="menu dropdown-content z-50 mt-3 w-52 rounded-2xl bg-base-100 p-2 shadow-xl">
              <li>
                <a>Profil</a>
              </li>
              <li>
                <a>Ayarlar</a>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;