import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "A", v: 20 },
  { name: "B", v: 45 },
  { name: "C", v: 30 },
  { name: "D", v: 70 },
  { name: "E", v: 55 },
];

const pie = [{ value: 40 }, { value: 35 }, { value: 25 }];

const COLORS = ["#22c55e", "#4ade80", "#86efac"];

export default function RightAnimatedAnalytics() {
  return (
    <div
      className="
        h-full w-full grid grid-cols-2 grid-rows-2 gap-5 p-6
        rounded-3xl
        bg-gradient-to-br from-green-100 via-emerald-50 to-green-200
        border border-green-300
        transition-all duration-700
        hover:scale-[1.03]
        hover:shadow-[0_20px_60px_rgba(34,197,94,0.35)]
      "
    >
      {/* WAVE AREA */}
      <div
        className="
          rounded-2xl p-3
          bg-gradient-to-br from-green-200 to-green-100
          transition-all duration-500
          hover:scale-110 hover:-rotate-1
          hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <Area
              dataKey="v"
              stroke="#16a34a"
              strokeWidth={3}
              fill="url(#wave)"
              animationDuration={1600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* LINE */}
      <div
        className="
          rounded-2xl p-3
          bg-gradient-to-br from-emerald-200 to-green-100
          transition-all duration-500
          hover:scale-110 hover:rotate-1
          hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{ r: 6, fill: "#4ade80" }}
              animationDuration={1400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div
        className="
          rounded-2xl p-3
          bg-gradient-to-br from-green-300 to-green-100
          transition-all duration-500
          hover:scale-110 hover:-rotate-1
          hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Bar
              dataKey="v"
              fill="#22c55e"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE */}
      <div
        className="
          rounded-2xl p-3
          bg-gradient-to-br from-emerald-300 to-green-100
          transition-all duration-500
          hover:scale-110 hover:rotate-2
          hover:shadow-[0_15px_40px_rgba(34,197,94,0.45)]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pie}
              dataKey="value"
              innerRadius={35}
              outerRadius={70}
              paddingAngle={6}
              animationDuration={1500}
            >
              {pie.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
