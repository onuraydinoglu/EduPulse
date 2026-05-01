import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/menuItems";
import { authStorage } from "../../features/auth/services/authStorage";
import {
  AcademicCapIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const user = authStorage.getUser();

  const [openGroup, setOpenGroup] = useState(null);
  const userRole = String(user?.role || user?.roleName || "").toLowerCase();

  const hasRole = (item) =>
    item.roles?.map((role) => role.toLowerCase()).includes(userRole);

  const sidebarItems = useMemo(() => {
    return menuItems
      .map((item) => {
        if (!item.children) {
          return hasRole(item) ? item : null;
        }

        const visibleChildren = item.children.filter(hasRole);

        if (visibleChildren.length === 0) return null;

        if (visibleChildren.length === 1) {
          return visibleChildren[0];
        }

        return {
          ...item,
          children: visibleChildren,
        };
      })
      .filter(Boolean);
  }, [userRole]);

  const toggleGroup = (title) => {
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  const handleLogout = () => {
    authStorage.removeUser();
    navigate("/login");
  };

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="dashboard-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <aside
        className={`flex min-h-full flex-col border-r border-base-300/70 bg-base-100/80 shadow-xl backdrop-blur-2xl transition-all duration-300 ${collapsed ? "lg:w-20" : "lg:w-66"
          } w-66`}
      >
        <div className={`${collapsed ? "lg:px-3" : "lg:px-6"} px-6 py-6`}>
          <div
            className={`flex items-center ${collapsed ? "lg:justify-center" : "lg:gap-3"
              } gap-3`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <AcademicCapIcon className="h-6 w-6" />
            </div>

            <div className={`${collapsed ? "lg:hidden" : ""}`}>
              <h1 className="text-lg font-bold leading-tight">EduPulse</h1>
              <p className="text-xs text-base-content/50">
                Okul Yönetim Sistemi
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 pb-6 pt-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            if (item.children) {
              const isOpen = openGroup === item.title;

              return (
                <div key={item.title} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.title)}
                    className={`group relative flex w-full items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${collapsed
                      ? "lg:justify-center lg:px-2"
                      : "lg:gap-3 lg:px-3"
                      } gap-3 px-3 text-base-content/55 hover:bg-base-200/60 hover:text-base-content`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg text-base-content/45 transition-colors duration-200 group-hover:bg-base-300/50 group-hover:text-base-content">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>

                    <span
                      className={`flex-1 text-left tracking-tight ${collapsed ? "lg:hidden" : ""
                        }`}
                    >
                      {item.title}
                    </span>

                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        } ${collapsed ? "lg:hidden" : ""}`}
                    />

                    {collapsed && (
                      <span className="pointer-events-none absolute left-16 z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
                        {item.title}
                      </span>
                    )}
                  </button>

                  {isOpen && !collapsed && (
                    <div className="ml-5 space-y-1 pl-3">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            end={child.path === "/dashboard"}
                            className={({ isActive }) =>
                              `group relative flex items-center gap-3 rounded-xl px-3 py-1 text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-base-200 text-base-content"
                                : "text-base-content/55 hover:bg-base-200/60 hover:text-base-content"
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                                )}

                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-base-content/45 group-hover:bg-base-300/50 group-hover:text-base-content"
                                    }`}
                                >
                                  <ChildIcon className="h-[17px] w-[17px]" />
                                </span>

                                <span className="tracking-tight">
                                  {child.title}
                                </span>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}

                  {isOpen && collapsed && (
                    <div className="hidden lg:block">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            end={child.path === "/dashboard"}
                            className={({ isActive }) =>
                              `group relative mt-1 flex items-center justify-center rounded-xl px-2 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-base-200 text-base-content"
                                : "text-base-content/45 hover:bg-base-200/60 hover:text-base-content"
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <span
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-base-content/45 group-hover:bg-base-300/50 group-hover:text-base-content"
                                    }`}
                                >
                                  <ChildIcon className="h-[18px] w-[18px]" />
                                </span>

                                <span className="pointer-events-none absolute left-16 z-50 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                                  {child.title}
                                </span>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${collapsed
                    ? "lg:justify-center lg:px-2"
                    : "lg:gap-3 lg:px-3"
                  } gap-3 px-3 ${isActive
                    ? "bg-base-200 text-base-content"
                    : "text-base-content/55 hover:bg-base-200/60 hover:text-base-content"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary ${collapsed ? "lg:hidden" : ""
                          }`}
                      />
                    )}

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/45 group-hover:bg-base-300/50 group-hover:text-base-content"
                        }`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>

                    <span
                      className={`tracking-tight ${collapsed ? "lg:hidden" : ""
                        }`}
                    >
                      {item.title}
                    </span>

                    {collapsed && (
                      <span className="pointer-events-none absolute left-16 z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
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
          <div className={`${collapsed ? "lg:hidden" : ""}`}>
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline w-full rounded-2xl font-semibold"
            >
              Çıkış Yap
            </button>
          </div>

          {collapsed && (
            <button
              onClick={handleLogout}
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-error transition hover:bg-error/10 lg:flex"
              title="Çıkış Yap"
            />
          )}
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;