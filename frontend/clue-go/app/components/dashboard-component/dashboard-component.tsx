import { useAuth } from "~/context/auth-context";
import { Link } from "react-router";
import { IconComponent } from "../icon-component/icon-component";
import { useTranslation } from "react-i18next";

export const DashboardComponent = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-5 md:pt-15 pb-4 gap-5">
        <h2 className="text-4xl md:text-5xl text-center mb-5">
          {t("dashboard.welcome_back")}
          <span className="text-primary">{user?.name}</span>
        </h2>
        <section className="w-[80%] md:w-[60%]">
          <h3 className="text-4xl text-center">
            {t("dashboard.what_do_you_want")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <Link
              to="/create"
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-[1.02] transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold flex gap-2">
                <IconComponent name="edit" /> {t("dashboard.create_title")}
              </h2>
              <p className="text-gray-500 mt-2">{t("dashboard.create_desc")}</p>
            </Link>

            <Link
              to="/explore"
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-[1.02] transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold flex gap-2">
                <IconComponent name="search" /> {t("dashboard.explore_title")}
              </h2>
              <p className="text-gray-500 mt-2">
                {t("dashboard.explore_desc")}
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
