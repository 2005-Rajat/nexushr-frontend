import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    LineChart, Line
} from "recharts";

const COLORS = ["#7C3AED", "#111827", "#15803D", "#F59E0B", "#2563EB", "#DC2626"];

function Charts({ employees = [] }) {

    if (employees.length === 0) {
        return (
            <div className="card p-5 text-center" style={{ color: "#374151", fontWeight: 600 }}>
                No data available yet. Add employees to see analytics.
            </div>
        );
    }

    const deptCounts = {};
    employees.forEach((emp) => {
        const dept = emp.department || "Unassigned";
        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    const departmentData = Object.keys(deptCounts).map((dept) => ({
        department: dept,
        employees: deptCounts[dept]
    }));

    const deptSalary = {};
    const deptSalaryCount = {};
    employees.forEach((emp) => {
        const dept = emp.department || "Unassigned";
        deptSalary[dept] = (deptSalary[dept] || 0) + Number(emp.salary || 0);
        deptSalaryCount[dept] = (deptSalaryCount[dept] || 0) + 1;
    });
    const salaryData = Object.keys(deptSalary).map((dept) => ({
        department: dept,
        avgSalary: Math.round(deptSalary[dept] / deptSalaryCount[dept])
    }));

    const monthCounts = {};
    employees.forEach((emp) => {
        if (!emp.joiningDate) return;
        const date = new Date(emp.joiningDate);
        const key = date.toLocaleString("default", { month: "short", year: "numeric" });
        monthCounts[key] = (monthCounts[key] || 0) + 1;
    });
    const hiringData = Object.keys(monthCounts)
        .map((month) => ({ month, hires: monthCounts[month] }))
        .sort((a, b) => new Date(a.month) - new Date(b.month));

    return (
        <div className="row g-4">

            <div className="col-lg-4">
                <div className="card stat-card h-100 p-3" style={{ border: "1px solid #E5E7EB" }}>
                    <h6 className="fw-bold mb-3" style={{ color: "#111827" }}>Employees per Department</h6>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={departmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="department" fontSize={12} stroke="#374151" />
                            <YAxis allowDecimals={false} fontSize={12} stroke="#374151" />
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(17,24,39,0.15)" }} />
                            <Bar dataKey="employees" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card stat-card h-100 p-3" style={{ border: "1px solid #E5E7EB" }}>
                    <h6 className="fw-bold mb-3" style={{ color: "#111827" }}>Salary by Department</h6>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={salaryData}
                                dataKey="avgSalary"
                                nameKey="department"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {salaryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(17,24,39,0.15)" }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card stat-card h-100 p-3" style={{ border: "1px solid #E5E7EB" }}>
                    <h6 className="fw-bold mb-3" style={{ color: "#111827" }}>Hiring Trend</h6>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={hiringData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="month" fontSize={12} stroke="#374151" />
                            <YAxis allowDecimals={false} fontSize={12} stroke="#374151" />
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(17,24,39,0.15)" }} />
                            <Line type="monotone" dataKey="hires" stroke="#15803D" strokeWidth={2.5} dot={{ fill: "#15803D", r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default Charts;