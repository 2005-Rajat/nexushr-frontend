import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    LineChart, Line
} from "recharts";

const COLORS = ["#8458B3", "#A0D2EB", "#D0BDF4", "#494D5F", "#4CAF7D", "#E0A845"];

function Charts({ employees = [] }) {

    if (employees.length === 0) {
        return (
            <div className="card p-5 text-center" style={{ color: "#9B9FB0" }}>
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
                <div className="card stat-card h-100 p-3">
                    <h6 className="fw-bold mb-3">Employees per Department</h6>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={departmentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F8" />
                            <XAxis dataKey="department" fontSize={12} stroke="#9B9FB0" />
                            <YAxis allowDecimals={false} fontSize={12} stroke="#9B9FB0" />
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(73,77,95,0.15)" }} />
                            <Bar dataKey="employees" fill="#8458B3" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card stat-card h-100 p-3">
                    <h6 className="fw-bold mb-3">Salary by Department</h6>
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
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(73,77,95,0.15)" }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card stat-card h-100 p-3">
                    <h6 className="fw-bold mb-3">Hiring Trend</h6>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={hiringData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F8" />
                            <XAxis dataKey="month" fontSize={12} stroke="#9B9FB0" />
                            <YAxis allowDecimals={false} fontSize={12} stroke="#9B9FB0" />
                            <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(73,77,95,0.15)" }} />
                            <Line type="monotone" dataKey="hires" stroke="#4CAF7D" strokeWidth={2.5} dot={{ fill: "#4CAF7D", r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default Charts;