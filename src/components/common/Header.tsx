import { House, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { COLORS } from "../../constants";

function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: House },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header
      style={{
        height: 100,
        backgroundColor: COLORS.BACKGROUND,
        padding: "0 20px",
      }}
      className="bg-surface shadow-lg  flex flex-row justify-between items-center "
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-primary mr-auto"
        style={{ textDecoration: "none" }}
      >
        <img
          style={{
            height: 80,
            width: 80,
          }}
          src="../public/midea.png"
          alt="SafeBake"
          className="mr-auto"
        />
      </Link>
      <div className=" flex flex-row">
        {/* Navigation */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "10px 20px",
              textDecoration: "none",
            }}
            className={`   flex flex-row gap-1 items-center  rounded-lg text-sm font-medium transition-smooth  ${
              location.pathname === item.path
                ? "opacity-100 "
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {item.icon && <item.icon className="inline mr-2" />}
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Header;
