import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaHistory, FaCalendarCheck } from "react-icons/fa";

import Sidebar, { SIDEBAR_WIDTH } from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function Attendance() {

    const [employees, setEmployees] = useState([]);
    const [todayRecords, setTodayRecords] = useState([]);
    const [historyRecords, setHistoryRecords] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [activeTab, setActiveTab] = useState("today"); // "today" | "history"
    const [historyFilter, setHistoryFilter] = useState("");

    useEffect(() => {
        loadEmployees();
        loadToday();
        loadHistory();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await API.get("/employees");
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadToday = async () => {
        try {
            const response = await API.get("/attendance/today");
            setTodayRecords(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadHistory = async () => {
        try {
            const response = await API.get("/attendance");
            setHistoryRecords(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshAll = () => {
        loadToday();
        loadHistory();
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    };

    const handleCheckIn = async () => {

        if (!selectedEmployeeId) {
            showMessage("danger", "Please select an employee first.");
            return;
        }

        setActionLoading(true);

        try {
            await API.post("/attendance/checkin", { employeeId: selectedEmployeeId });
            showMessage("success", "Checked in successfully.");
            refreshAll();
        } catch (error) {
            const msg = error.response?.data?.message || "Unable to check in.";
            showMessage("danger", msg);
        } finally {
            setActionLoading(false);
        }

    };

    const handleCheckOut = async () => {

        if (!selectedEmployeeId) {
            showMessage("danger", "Please select an employee first.");
            return;
        }

        setActionLoading(true);

        try {
            await API.post("/attendance/checkout", { employeeId: selectedEmployeeId });
            showMessage("success", "Checked out successfully.");
            refreshAll();
        } catch (error) {
            const msg = error.response?.data?.message || "Unable to check out.";
            showMessage("danger", msg);
        } finally {
            setActionLoading(false);
        }

    };

    const statusBadge = (status) => {
        if (status === "Late") return { background: "#F59E0B", color: "#fff" };
        if (status === "Present") return { background: "#15803D", color: "#fff" };
        return { background: "#8A7F63", color: "#fff" };
    };

    const filteredHistory = historyFilter
        ? historyRecords.filter((rec) =>
            rec.employeeId.toLowerCase().includes(historyFilter.toLowerCase()) ||
            (rec.employeeName || "").toLowerCase().includes(historyFilter.toLowerCase())
        )
        : historyRecords;

    return (

        <>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div
                style={{
                    marginLeft: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px",
                    background: "#FFFDF7",
                    minHeight: "100vh",
                    transition: "margin-left 0.25s ease"
                }}
            >

                <Navbar title="Attendance" />

                <div className="container-fluid p-4">

                    <h3 className="fw-bold mb-4" style={{ color: "#1B1F3B" }}>
                        Attendance
                    </h3>

                    {/* Mark Attendance card */}
                    <div
                        className="card mb-4"
                        style={{ border: "1px solid #EAE2C9", borderRadius: "16px", padding: "24px" }}
                    >

                        <h6 className="fw-bold mb-3" style={{ color: "#1B1F3B" }}>
                            Mark Attendance
                        </h6>

                        {message.text && (
                            <div
                                className={`alert alert-${message.type === "danger" ? "danger" : "success"} py-2`}
                                style={{ fontSize: "14px" }}
                            >
                                {message.text}
                            </div>
                        )}

                        <div className="row g-3 align-items-end">

                            <div className="col-md-6">
                                <label className="form-label" style={{ fontSize: "13px", fontWeight: 600, color: "#5C5440" }}>
                                    Select Employee
                                </label>
                                <select
                                    className="form-select"
                                    value={selectedEmployeeId}
                                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                >
                                    <option value="">-- Choose employee --</option>
                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.employeeId}>
                                            {emp.employeeId} — {emp.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                                    style={{ background: "#15803D", color: "#fff", border: "none", height: "42px" }}
                                    onClick={handleCheckIn}
                                    disabled={actionLoading}
                                >
                                    <FaSignInAlt size={14} /> Check In
                                </button>
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                                    style={{ background: "#1B1F3B", color: "#FFFDF7", border: "none", height: "42px" }}
                                    onClick={handleCheckOut}
                                    disabled={actionLoading}
                                >
                                    <FaSignOutAlt size={14} /> Check Out
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* Tabs */}
                    <div className="d-flex gap-2 mb-3">

                        <button
                            className="btn d-flex align-items-center gap-2"
                            style={{
                                background: activeTab === "today" ? "#1B1F3B" : "#FFFCF2",
                                color: activeTab === "today" ? "#FFFDF7" : "#1B1F3B",
                                border: "1px solid #EAE2C9",
                                fontWeight: 600
                            }}
                            onClick={() => setActiveTab("today")}
                        >
                            <FaCalendarCheck size={13} /> Today
                        </button>

                        <button
                            className="btn d-flex align-items-center gap-2"
                            style={{
                                background: activeTab === "history" ? "#1B1F3B" : "#FFFCF2",
                                color: activeTab === "history" ? "#FFFDF7" : "#1B1F3B",
                                border: "1px solid #EAE2C9",
                                fontWeight: 600
                            }}
                            onClick={() => setActiveTab("history")}
                        >
                            <FaHistory size={13} /> Full History
                        </button>

                    </div>

                    {activeTab === "history" && (
                        <input
                            className="form-control mb-3"
                            placeholder="🔍 Search by Employee ID or Name..."
                            value={historyFilter}
                            onChange={(e) => setHistoryFilter(e.target.value)}
                        />
                    )}

                    <div className="card" style={{ overflow: "hidden", border: "1px solid #EAE2C9" }}>

                        <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ background: "#1B1F3B", padding: "16px 24px" }}
                        >
                            <h6 style={{ color: "#FFFDF7", margin: 0, fontWeight: 700 }}>
                                {activeTab === "today" ? "Today's Attendance" : "Attendance History"}
                            </h6>
                            <small style={{ color: "#C2A25F" }}>
                                {(activeTab === "today" ? todayRecords : filteredHistory).length} record(s)
                            </small>
                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead style={{ background: "#FFFCF2" }}>
                                    <tr>
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Employee ID</th>
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Name</th>
                                        {activeTab === "history" && (
                                            <th style={{ color: "#5C5440", fontSize: "13px" }}>Date</th>
                                        )}
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Check-In</th>
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Check-Out</th>
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Method</th>
                                        <th style={{ color: "#5C5440", fontSize: "13px" }}>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {(activeTab === "today" ? todayRecords : filteredHistory).length > 0 ? (

                                        (activeTab === "today" ? todayRecords : filteredHistory).map((rec) => (

                                            <tr key={rec.id}>
                                                <td className="font-mono" style={{ fontWeight: 600 }}>{rec.employeeId}</td>
                                                <td style={{ fontWeight: 600, color: "#1B1F3B" }}>{rec.employeeName}</td>
                                                {activeTab === "history" && (
                                                    <td style={{ color: "#5C5440" }}>{rec.date}</td>
                                                )}
                                                <td>{rec.checkInTime || "—"}</td>
                                                <td>{rec.checkOutTime || "—"}</td>
                                                <td style={{ color: "#8A7F63" }}>{rec.method || "—"}</td>
                                                <td>
                                                    <span className="badge" style={statusBadge(rec.status)}>
                                                        {rec.status}
                                                    </span>
                                                </td>
                                            </tr>

                                        ))

                                    ) : (

                                        <tr>
                                            <td colSpan={activeTab === "history" ? 7 : 6} className="text-center py-4" style={{ color: "#8A7F63" }}>
                                                No attendance records found.
                                            </td>
                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Attendance;
