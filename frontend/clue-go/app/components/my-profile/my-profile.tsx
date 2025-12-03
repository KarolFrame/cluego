import { useState } from "react";
import { useAuth } from "~/context/auth-context";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import defaultAvatar from "./default-avatar.svg";
import { toast } from "sonner";

export const MyProfile = () => {
  const { user, token, refreshUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadAvatar = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("http://localhost:4000/api/profile/avatar", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      refreshUser({ ...user, avatarUrl: data.avatarUrl });
      setSuccess("Foto actualizada correctamente");
    } else {
      setError(data.message || "Error al subir la foto");
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost:4000/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.message || "Error al guardar datos");
      toast.error(error);
      return;
    }

    refreshUser(data.user);
    setSuccess("Datos actualizados");
    toast.success(success);
  };
  return (
    <>
      <div className="pt-5 pb-4 md:overflow-hidden">
        <div className="flex flex-col items-center justify-start gap-5 mx-7">
          {" "}
          <h1 className="text-2xl md:text-3xl font-bold">
            {t("profile.title")}
          </h1>
          <section className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={user.avatarUrl || defaultAvatar}
              className="w-20 h-20 md:w-25 md:h-25 rounded-full object-cover"
            />
            <div>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-primary p-3 rounded-md bg-gray-100 dark:bg-gray-800 hover:cursor-pointer"
              />
              <button
                onClick={uploadAvatar}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-md"
              >
                {t("profile.update_avatar")}
              </button>
            </div>
          </section>
          <section className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("profile.name")}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
            />

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder={t("profile.bio")}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800 h-24"
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder={t("profile.location")}
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-800"
            />

            <button
              onClick={saveProfile}
              className="w-full py-3 bg-primary text-white rounded-md"
              disabled={saving}
            >
              {saving ? t("profile.saving") : t("profile.save")}
            </button>
          </section>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full py-3 text-gray-800 dark:text-gray-300"
          >
            {t("profile.logout")}
          </button>
        </div>
      </div>
    </>
  );
};
