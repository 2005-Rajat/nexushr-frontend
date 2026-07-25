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
      icon: <FaUsers size={20} color="#FFFDF7" />,
      chipBg: "#1B1F3B",
      value: total,
      label: "Total Employees",
      trend: newThisMonth > 0
        ? `+${newThisMonth} joined this month`
        : "No new hires this month",
      trendColor: newThisMonth > 0 ? "#15803D" : "#8A7F63"
    },
    {
      icon: <FaUserCheck size={20} color="#FFFDF7" />,
      chipBg: "#15803D",
      value: activeCount,
      label: "Active Employees",
      trend: `${activePercent}% of total workforce`,
      trendColor: "#8A7F63"
    },
    {
      icon: <FaMoneyBillWave size={20} color="#1B1F3B" />,
      chipBg: "#C2A25F",
      value: `₹ ${avgSalary.toLocaleString()}`,
      label: "Average Salary",
      trend: salaries.length > 0
        ? `₹${lowestSalary.toLocaleString()} – ₹${highestSalary.toLocaleString()} range`
        : "No salary data",
      trendColor: "#8A7F63"
    },
    {
      icon: <FaBuilding size={20} color="#FFFDF7" />,
      chipBg: "#1B1F3B",
      value: departments,
      label: "Departments",
      trend: "Across your workforce",
      trendColor: "#8A7F63"
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
              border: "1px solid #EAE2C9",
              boxShadow: "0 2px 10px rgba(27,31,59,0.06)"
            }}
          >

            <div style={{ height: "5px", background: "linear-gradient(90deg, #1B1F3B 0%, #C2A25F 100%)" }} />

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
                  color: "#1B1F3B",
                  marginBottom: "4px"
                }}
              >
                {card.value}
              </h3>

              <p style={{ color: "#5C5440", fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
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