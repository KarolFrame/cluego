import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const CreateAccountComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await result.json();

      if (!result.ok) {
        setError(data.message || "Error creating account");
        toast.error(error);
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Network error");
      toast.error("Network error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: e.target.value });
    if (name === "password") {
      if (!validatePassword(value)) {
        setPasswordError(t("auth.password_error"));
      } else {
        setPasswordError("");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-16 pb-4 gap-5 h-[60vh]">
        <h2 className="text-4xl">{t("home.signup")}</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:w-[50%] max-w-[500px]"
        >
          <input
            type="text"
            name="name"
            placeholder={t("auth.name")}
            className="p-3 rounded-md bg-gray-100 dark:bg-gray-800"
            onChange={handleChange}
          />

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
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <button
            type="submit"
            className="p-3 bg-primary rounded-md font-semibold"
          >
            {t("auth.create_account")}
          </button>
        </form>

        <p className="text-center mt-4">
          {t("auth.have_account")}{" "}
          <a href="/signin" className="text-primary underline">
            {t("auth.login")}
          </a>
        </p>
      </div>
    </>
  );
};
