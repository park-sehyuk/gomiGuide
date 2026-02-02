import { useLocation, matchPath, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="HeaderLogo">
        <p>GOMI</p>
        <img src="" alt="Logo" />
      </Link>
    </header>
  );
};

export default Header;
