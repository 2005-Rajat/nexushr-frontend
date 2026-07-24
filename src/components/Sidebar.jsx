import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaBuilding
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { icon: <FaTachometerAlt />, name: "Dashboard", path: "/dashboard" },
    { icon: <FaUsers />, name: "Employees", path: "/dashboard" },
    { icon: <FaCalendarAlt />, name: "Attendance", path: "/attendance" },
    { icon: <FaMoneyCheckAlt />, name: "Payroll", path: "/payroll" },
    { icon: <FaChartLine />, name: "Analytics", path: "/analytics" },
    { icon: <FaBuilding />, name: "Departments", path: "/departments" },
    { icon: <FaCog />, name: "Settings", path: "/settings" }
  ];

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#0D0F1C",
        position: "fixed",
        color: "#FFFFFF",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "5px 0 30px rgba(0,0,0,0.4)",
        zIndex: 10,
        borderRight: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      <div>

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "24px",
            marginBottom: "10px",
            color: "#FFFFFF",
            letterSpacing: "-0.5px"
          }}
        >
          Nexus<span style={{ color: "#9333EA" }}>HR</span>
        </h2>

        <div
          style={{
            height: "4px",
            width: "60px",
            background: "#9333EA",
            borderRadius: "999px",
            marginBottom: "35px"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "35px",
            background: "#171A2B",
            padding: "12px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <FaUserCircle size={40} color="#9333EA" />

          <div>
            <h6 style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#FFFFFF" }}>
              {user ? user.name : "Administrator"}
            </h6>

            <small style={{ color: "#9CA3AF", fontSize: "12px", letterSpacing: "0.5px", fontWeight: 600 }}>
              {user ? user.role : "ADMIN"}
            </small>
          </div>
        </div>

        {menu.map((item, index) => {

          const isActive = location.pathname === item.path;

          return (

            <div
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "13px 14px",
                borderRadius: "12px",
                marginBottom: "8px",
                cursor: "pointer",
                transition: "0.15s ease",
                fontSize: "15px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? 700 : 600,
                background: isActive ? "#7C3AED" : "transparent",
                color: "#FFFFFF",
                boxShadow: isActive ? "0 6px 18px rgba(124, 58, 237, 0.45)" : "none"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#7C3AED";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.icon}

              {item.name}

            </div>

          );

        })}

      </div>

      <div
        onClick={logout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px",
          background: "#DC2626",
          borderRadius: "12px",
          cursor: "pointer",
          justifyContent: "center",
          fontWeight: "700",
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          transition: "0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#B91C1C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#DC2626";
        }}
      >
        <FaSignOutAlt />

        Logout

      </div>

    </div>
  );
}

export default Sidebar;