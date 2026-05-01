import { NavLink, useNavigate } from "react-router-dom";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { authStorage } from "../../features/auth/services/authStorage";

function Navbar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const displayName = user?.fullName || user?.email || "Kullanıcı";
  const displayRole = user?.roleName || user?.role || "Rol yok";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    authStorage.removeUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-3 lg:px-6">
        <div className="flex items-center gap-3">
          <label
            htmlFor="dashboard-drawer"
            aria-label="open sidebar"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Bars3BottomLeftIcon className="h-5 w-5" />
          </label>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:flex"
          >
            <Bars3BottomLeftIcon className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-base font-semibold tracking-tight text-gray-950">
              Hoş geldin, {displayName}
            </h1>
            <p className="text-xs text-gray-500">
              Bugünkü okul yönetim özetiniz hazır
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
          </div>

          <div className="dropdown dropdown-end">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-1.5 transition hover:bg-gray-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-700">
                {initials || "U"}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold leading-4 text-gray-900">
                  {displayName}
                </p>
                <p className="text-xs capitalize text-gray-400">
                  {displayRole}
                </p>
              </div>

              <ChevronDownIcon className="hidden h-4 w-4 text-gray-400 md:block" />
            </button>

            <ul className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
              <li>
                <NavLink to="/dashboard/profile" className="rounded-xl">
                  <UserCircleIcon className="h-5 w-5" />
                  Profil
                </NavLink>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl text-red-500 hover:bg-red-50"
                >
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