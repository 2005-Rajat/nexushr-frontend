import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {

  return (

    <div
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        borderBottom: "1px solid #E5EAF5",
        position: "sticky",
        top: 0,
        zIndex: 5
      }}
    >

      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#494D5F", margin: 0 }}>
        NexusHR Dashboard
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>

        <FaSearch size={18} color="#8458B3" style={{ cursor: "pointer" }} />

        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={18} color="#8458B3" />
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "8px",
              height: "8px",
              background: "#E0A845",
              borderRadius: "50%"
            }}
          />
        </div>

        <FaUserCircle size={30} color="#494D5F" style={{ cursor: "pointer" }} />

      </div>

    </div>

  );

}

export default Navbar;