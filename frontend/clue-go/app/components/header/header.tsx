import { Link } from "react-router";
import logo from "./logo-cluego.svg";
import { useAuth } from "~/context/auth-context";
import { HeaderActions } from "../header-actions/header-actions";

export const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <header className="p-5 pt-6 flex justify-around items-center">
        {user && <div></div>}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex gap-3 items-center text-center justify-center"
        >
          <img src={logo} alt="cluego logo" className="block w-12 md:w-16" />
          <h1 className="text-4xl md:text-6xl">ClueGo</h1>
        </Link>
        {user && <HeaderActions />}
      </header>
    </>
  );
};
