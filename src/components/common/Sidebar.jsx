import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/menuItems";
import { authStorage } from "../../features/auth/services/authStorage";
import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const displayName = user?.fullName || user?.email || "Kullanıcı";
  const displayRole = user?.roleName || user?.role || "Rol yok";
  const userRole = displayRole.toLowerCase();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.map((role) => role.toLowerCase()).includes(userRole)
  );

  const handleLogout = () => {
    authStorage.removeUser();
    navigate("/login");
  };

  return (
    <aside
      className={`flex min-h-full flex-col border-r border-base-300/70 bg-base-100/80 shadow-xl backdrop-blur-2xl transition-all duration-300 ${collapsed ? "w-20" : "w-72"
        }`}
    >
      <div className={`${collapsed ? "px-3" : "px-6"} py-6`}>
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
            }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <AcademicCapIcon className="h-6 w-6" />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold leading-tight">EduPulse</h1>
              <p className="text-xs text-base-content/50">
                Okul Yönetim Sistemi
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 pb-6 pt-3">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${collapsed ? "justify-center px-2" : "gap-3 px-3"
                } ${isActive
                  ? "bg-base-200 text-base-content"
                  : "text-base-content/55 hover:bg-base-200/60 hover:text-base-content"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && !collapsed && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                  )}

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/45 group-hover:bg-base-300/50 group-hover:text-base-content"
                      }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  {!collapsed && (
                    <span className="tracking-tight">{item.title}</span>
                  )}

                  {collapsed && (
                    <span className="pointer-events-none absolute left-16 z-50 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                      {item.title}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-base-300/70 p-4">
        {!collapsed ? (
          <>
            <div className="mb-3 rounded-2xl bg-base-200/70 p-3">
              <p className="text-sm font-bold">{displayName}</p>
              <p className="text-xs capitalize text-base-content/50">
                {displayRole}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline w-full rounded-2xl font-semibold"
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-error transition hover:bg-error/10"
            title="Çıkış Yap"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;