import { useLocation } from "react-router-dom";
import { FaTools } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ComingSoon() {

    const location = useLocation();
    const pageName = location.pathname.replace("/", "");
    const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    return (
        <>
            <Sidebar />

            <div style={{ marginLeft: "260px", background: "#f3f6fb", minHeight: "100vh" }}>

                <Navbar />

                <div
                    className="d-flex flex-column align-items-center justify-content-center text-center"
                    style={{ height: "calc(100vh - 70px)" }}
                >
                    <FaTools size={60} color="#94a3b8" />
                    <h3 className="mt-4 text-muted">{title} Module</h3>
                    <p className="text-muted">Coming soon — this module is under active development.</p>
                </div>

            </div>
        </>
    );
}

export default ComingSoon;