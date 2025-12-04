import { useTranslation } from "react-i18next";
import { ExpereinceCard } from "../user-profile-experience-list-card/user-profile-experience-list-card";

type PublicExperience = {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  mode: string;
};

type ExperienceList = {
  list: [];
  ownProfile: boolean;
};

export const UserProfileExperiencesList = ({
  list,
  ownProfile,
}: ExperienceList) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {list.map((exp: PublicExperience) => (
          <>
            <ExpereinceCard exp={exp} ownProfile={ownProfile} />
          </>
        ))}
      </div>
    </>
  );
};
