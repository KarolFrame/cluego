import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "~/context/auth-context";

export const SignInComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await result.json();

      if (!result.ok) {
        setError(data.message || "Invalid credentials");
        toast.error(error);
        return;
      }
      toast.success(t("auth.signin_succes"));
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Network error");
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-16 pb-4 gap-5 h-[60vh]">
        <h2 className="text-4xl">{t("home.signin")}</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:w-[50%] max-w-[500px]"
        >
          <input
            type="email"
            name="email"
            placeholder={t("auth.email")}
            className="p-3 rounded-md bg-gray-100 dark:bg-gray-800"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder={t("auth.password")}
            className="p-3 rounded-md bg-gray-100 dark:bg-gray-800"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-3 bg-primary rounded-md font-semibold"
          >
            {t("auth.signin")}
          </button>
        </form>

        <p className="text-center mt-4">
          {t("auth.no_account")}{" "}
          <a href="/create-account" className="text-primary underline">
            {t("auth.create_account")}
          </a>
        </p>
      </div>
    </>
  );
};
