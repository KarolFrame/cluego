import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

export const PrivacyModal = () => {
  const { t } = useTranslation();

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:text-primary">
        {t("legal.privacy")}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            {t("legal.privacy_title")}
          </Dialog.Title>

          <div className="space-y-4 text-sm opacity-80 max-h-[60vh] overflow-y-auto">
            <p>{t("legal.privacy_intro")}</p>

            <h3 className="font-semibold">{t("legal.privacy_collect")}</h3>
            <p>{t("legal.privacy_collect_text")}</p>

            <h3 className="font-semibold">{t("legal.privacy_use")}</h3>
            <p>{t("legal.privacy_use_text")}</p>

            <h3 className="font-semibold">{t("legal.privacy_rights")}</h3>
            <p>{t("legal.privacy_rights_text")}</p>

            <h3 className="font-semibold">{t("legal.privacy_cookies")}</h3>
            <p>{t("legal.privacy_cookies_text")}</p>
          </div>

          <Dialog.Close className="mt-6 px-4 py-2 rounded bg-primary text-white">
            OK
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
