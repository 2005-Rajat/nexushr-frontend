import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar({ title = "NexusHR Dashboard" }) {

  return (

    <div
      style={{
        background: "rgba(255, 253, 247, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        borderBottom: "1px solid #EAE2C9",
        position: "sticky",
        top: 0,
        zIndex: 5
      }}
    >

      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1B1F3B", margin: 0 }}>
        {title}
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>

        <FaSearch size={18} color="#C2A25F" style={{ cursor: "pointer" }} />

        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={18} color="#C2A25F" />
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

        <FaUserCircle size={30} color="#1B1F3B" style={{ cursor: "pointer" }} />

      </div>

    </div>

  );

}

export default Navbar;
