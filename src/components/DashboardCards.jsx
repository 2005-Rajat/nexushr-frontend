import { FaUsers, FaUserCheck, FaMoneyBillWave, FaBuilding } from "react-icons/fa";

function DashboardCards({ employees = [] }) {

  const total = employees.length;

  const activeCount = employees.filter(
    (emp) => (emp.status || "Active") === "Active"
  ).length;

  const activePercent = total === 0 ? 0 : Math.round((activeCount / total) * 100);

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0
  );

  const avgSalary = total === 0 ? 0 : Math.round(totalSalary / total);

  const salaries = employees.map((emp) => Number(emp.salary || 0)).filter((s) => s > 0);
  const highestSalary = salaries.length > 0 ? Math.max(...salaries) : 0;
  const lowestSalary = salaries.length > 0 ? Math.min(...salaries) : 0;

  const departments = new Set(
    employees.map((e) => e.department).filter(Boolean)
  ).size;

  const now = new Date();
  const newThisMonth = employees.filter((emp) => {
    if (!emp.joiningDate) return false;
    const joined = new Date(emp.joiningDate);
    return joined.getMonth() === now.getMonth() && joined.getFullYear() === now.getFullYear();
  }).length;

  const cards = [
    {
      icon: <FaUsers size={20} color="#FFFFFF" />,
      chipBg: "#7C3AED",
      value: total,
      label: "Total Employees",
      trend: newThisMonth > 0
        ? `+${newThisMonth} joined this month`
        : "No new hires this month",
      trendColor: newThisMonth > 0 ? "#15803D" : "#4B5563"
    },
    {
      icon: <FaUserCheck size={20} color="#FFFFFF" />,
      chipBg: "#15803D",
      value: activeCount,
      label: "Active Employees",
      trend: `${activePercent}% of total workforce`,
      trendColor: "#4B5563"
    },
    {
      icon: <FaMoneyBillWave size={20} color="#FFFFFF" />,
      chipBg: "#111827",
      value: `₹ ${avgSalary.toLocaleString()}`,
      label: "Average Salary",
      trend: salaries.length > 0
        ? `₹${lowestSalary.toLocaleString()} – ₹${highestSalary.toLocaleString()} range`
        : "No salary data",
      trendColor: "#4B5563"
    },
    {
      icon: <FaBuilding size={20} color="#FFFFFF" />,
      chipBg: "#7C3AED",
      value: departments,
      label: "Departments",
      trend: "Across your workforce",
      trendColor: "#4B5563"
    }
  ];

  return (
    <div className="row g-4">

      {cards.map((card, index) => (

        <div className="col-md-3 col-sm-6" key={index}>

          <div
            className="card stat-card h-100"
            style={{
              padding: "0",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(17,24,39,0.06)"
            }}
          >

            <div style={{ height: "5px", background: "#7C3AED" }} />

            <div style={{ padding: "24px" }}>

              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: card.chipBg
                }}
              >
                {card.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "#111827",
                  marginBottom: "4px"
                }}
              >
                {card.value}
              </h3>

              <p style={{ color: "#374151", fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
                {card.label}
              </p>

              <small style={{ color: card.trendColor, fontWeight: 700, fontSize: "12px" }}>
                {card.trend}
              </small>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;