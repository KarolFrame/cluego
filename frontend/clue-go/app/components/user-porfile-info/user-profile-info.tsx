import { IconComponent } from "../icon-component/icon-component";
import { useTranslation } from "react-i18next";

export const UserProfileInfo = ({ user }: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-center gap-5">
        <img src={user.avatarUrl} className="w-40 h-40 rounded-full" />
        <div className="flex flex-col justify-center items-center md:items-start">
          <h2 className="mb-4 text-5xl">{user.name}</h2>
          <div className="flex gap-4 jus">
            <p className="text-gray-700 dark:text-gray-300">
              {user.experiences.length} {t("user.followers")}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {user.experiences.length} {t("user.experiences")}
            </p>
          </div>
          <p className="flex items-center mt-1 justify-center md:justify-start">
            {user.location}
            <IconComponent name="location_on" />
          </p>
          <p className="mt-4 text-center md:text-start">{user.bio}</p>
        </div>
      </div>
    </>
  );
};
