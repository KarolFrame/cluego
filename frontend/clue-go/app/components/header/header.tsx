import { Link } from "react-router";
import logo from "./logo-cluego.svg";

export const Header = () => {
  return (
    <>
      <header className="p-5 pt-10 ">
        <Link
          to="/"
          className="flex gap-3 items-center text-center justify-center"
        >
          <img src={logo} alt="cluego logo" className="block w-12 md:w-16" />
          <h1 className="text-4xl md:text-6xl">ClueGo</h1>
        </Link>
      </header>
    </>
  );
};
