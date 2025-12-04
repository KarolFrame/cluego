import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/context/auth-context";
import defaultAvatar from "./default-avatar.svg";
import { useTranslation } from "react-i18next";

export const HeaderActions = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={user.avatarUrl || defaultAvatar}
        className="w-10 h-10 md:w-15 md:h-15 rounded-full hover:scale-105 transition-all cursor-pointer object-cover"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40
            bg-white dark:bg-gray-900 shadow-lg rounded-lg 
            
            animate-fadeIn
            z-50
          "
        >
          <Link
            to={`/user/${user.id}`}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg"
            onClick={() => setOpen(false)}
          >
            {t("header.my_profile")}
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg"
            onClick={() => setOpen(false)}
          >
            {t("header.edit_profile")}
          </Link>

          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            {t("header.dashboard")}
          </Link>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="block w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-b-lg"
          >
            {t("header.log_out")}
          </button>
        </div>
      )}
    </div>
  );
};
