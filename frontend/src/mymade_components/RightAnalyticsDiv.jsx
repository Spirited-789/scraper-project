import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [{ v: 20 }, { v: 45 }, { v: 30 }, { v: 70 }, { v: 55 }];

const pie = [{ value: 40 }, { value: 35 }, { value: 25 }];
const COLORS = ["#22c55e", "#4ade80", "#86efac"];

export default function RightGrid() {
  return (
    <div
      className="
        relative h-full w-full p-6
        grid grid-cols-2 grid-rows-2 gap-5
        rounded-3xl overflow-hidden

        bg-gradient-to-br from-[#0b120e] via-[#0f1a14] to-[#0b120e]
        border border-green-400/20

        animate-[pulse_6s_ease-in-out_infinite]
        transition-all duration-700
        hover:scale-[1.03]
        hover:shadow-[0_25px_80px_rgba(34,197,94,0.35)]
      "
    >
      {/* moving glow layer */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.25),transparent_45%)]
          animate-[spin_20s_linear_infinite]
        "
      />

      {/* AREA */}
      <div className="relative z-10 rounded-2xl bg-black/40 backdrop-blur-md p-3 animate-[bounce_8s_ease-in-out_infinite]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <Area
              dataKey="v"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#areaGlow)"
              animationDuration={1800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* LINE */}
      <div className="relative z-10 rounded-2xl bg-black/40 backdrop-blur-md p-3 animate-[bounce_9s_ease-in-out_infinite]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              dataKey="v"
              stroke="#4ade80"
              strokeWidth={4}
              dot={{ r: 6, fill: "#86efac" }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR */}
      <div className="relative z-10 rounded-2xl bg-black/40 backdrop-blur-md p-3 animate-[bounce_10s_ease-in-out_infinite]">
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
      <div className="relative z-10 rounded-2xl bg-black/40 backdrop-blur-md p-3 animate-[bounce_11s_ease-in-out_infinite]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pie}
              dataKey="value"
              innerRadius={35}
              outerRadius={70}
              paddingAngle={6}
              animationDuration={1600}
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
