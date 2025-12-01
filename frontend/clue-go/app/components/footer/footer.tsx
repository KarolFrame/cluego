import { PrivacyModal } from "../privacy-modal.tsx/privacy-modal";
import { TermsModal } from "../terms-modal.tsx/terms-modal";

export const Footer = () => {
  return (
    <>
      <footer className="mt-auto py-4 flex justify-center text-center opacity-60 px-10">
        <div className="flex gap-5">
          <span>© ClueGo 2025 </span>
          <span>
            <PrivacyModal />
          </span>
          <span>
            <TermsModal />
          </span>
        </div>
      </footer>
    </>
  );
};
