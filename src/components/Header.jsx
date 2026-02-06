import { useLocation, matchPath, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="HeaderLogo">
        <img src="/icon/gomiguide.png" alt="Logo" />
        <p>GOMI</p>
      </Link>
      <div className="Language">
        <button>KR</button>
        <p>|</p>
        <button>JP</button>
      </div>
    </header>
  );
};

export default Header;
