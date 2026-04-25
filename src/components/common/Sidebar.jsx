import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/menuItems";
import { authStorage } from "../../features/auth/services/authStorage";

function Sidebar() {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  const handleLogout = () => {
    authStorage.removeUser();
    navigate("/login");
  };

  return (
    <aside className="flex min-h-full w-72 flex-col border-r border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          OkulPro
        </h1>
        <p className="text-sm text-base-content/60">
          Okul Yönetim Sistemi
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-primary text-primary-content shadow-md"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-base-300 p-4">
        <button
          onClick={handleLogout}
          className="btn btn-error btn-outline w-full rounded-xl"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;