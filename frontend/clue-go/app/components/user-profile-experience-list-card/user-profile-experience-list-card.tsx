import { Link } from "react-router";
import { IconComponent } from "../icon-component/icon-component";
import { useTranslation } from "react-i18next";

export const ExpereinceCard = ({ exp, ownProfile }: any) => {
  const { t } = useTranslation();

  let icon = null;
  switch (exp.mode) {
    case "official":
      icon = <IconComponent name="extension" />;
      break;
    case "custom":
      icon = <IconComponent name="celebration" />;
      break;
    case "outdoor":
      icon = <IconComponent name="map" />;
      break;
  }
  return (
    <>
      <div
        className="bg-white dark:bg-gray-900 shadow-lg rounded-lg"
        key={exp.id}
      >
        <img src={exp.imageUrl} className="object-cover w-full rounded-t-lg " />
        <h3 className="text-xl font-bold p-2 flex justify-between">
          {exp.title}
          {icon}
        </h3>
        <p className=" p-2 text-gray-700 dark:text-gray-300 mb-2">
          {exp.description}
        </p>
        {ownProfile && (
          <>
            <Link
              to={`/experience-editor/${exp.id}`}
              className="p-2 font-bold m-2 flex gap-2 hover:scale-105 transition-[0.3s] border-2 rounded-xl w-50"
            >
              <IconComponent name="edit" />
              {t("user.edit_experience")}
            </Link>
          </>
        )}
      </div>
    </>
  );
};
