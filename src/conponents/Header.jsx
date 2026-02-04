import { useLocation, matchPath, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="HeaderLogo">
        <img src="/icon/gomiguide.png" alt="Logo" />
        <p>GOMI</p>
      </Link>
    </header>
  );
};

export default Header;
