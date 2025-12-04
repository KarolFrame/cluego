import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoaderComponent } from "../loader-component/loader-component";
import { IconComponent } from "../icon-component/icon-component";
import { UserProfileInfo } from "../user-porfile-info/user-profile-info";
import { UserProfileExperiencesList } from "../user-profile-experiences-list/user-profile-experiences-list";
import { useEffect, useState } from "react";
import { useAuth } from "~/context/auth-context";
import { useTranslation } from "react-i18next";

export const UserProfileComponent = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { id } = useParams();
  const [ownProfile, setOwnProfile] = useState(false);

  useEffect(() => {
    console.log(id, user.id);
    if (id == user.id) {
      setOwnProfile(true);
      console.log(id, user.id);
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["public-profile", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/users/${id}`);
      if (!res.ok) throw new Error("Failed to load profile");
      return res.json();
    },
    enabled: !!id,
  });
  const userData = data;
  return (
    <>
      <div className="flex flex-col items-center mt-5 justify-center gap-5 mx-7">
        {isLoading && <LoaderComponent />}
        {!userData && <span>User not found</span>}
        {!isLoading && userData && (
          <div className="container">
            <UserProfileInfo user={userData} />
            <div className="mt-10 mx-5">
              <h3 className="text-3xl mb-3 text-center md:text-start font-bold">
                {t("user.sec_experiences")}
              </h3>
              <UserProfileExperiencesList
                list={userData.experiences}
                ownProfile={ownProfile}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
