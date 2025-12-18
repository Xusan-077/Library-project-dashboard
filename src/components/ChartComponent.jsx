import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function ChartComponent() {
  const [theme, setTheme] = useState("light");

  const data = [
    { name: "Yan", value: 400 },
    { name: "Fev", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Iyun", value: 700 },
    { name: "Iyul", value: 900 },
    { name: "Avg", value: 750 },
    { name: "Sen", value: 850 },
    { name: "Okt", value: 950 },
    { name: "Noy", value: 1100 },
    { name: "Dek", value: 1000 },
  ];

  const isDark = theme === "dark";

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`px-3 py-2 rounded-lg shadow-lg ${
            isDark
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {payload[0].payload.name}
          </p>
          <p className="text-sm text-blue-500 font-medium">
            Qiymat: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto p-6">
        <div
          className={`rounded-xl shadow-xl p-6 transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Statistika
            </h2>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
            
            </button>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F7BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F7BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDark ? "#374151" : "#E5E7EB"}
                />

                <XAxis
                  dataKey="name"
                  stroke={isDark ? "#9CA3AF" : "#6B7280"}
                  tick={{ fill: isDark ? "#9CA3AF" : "#6B7280" }}
                />

                <YAxis
                  stroke={isDark ? "#9CA3AF" : "#6B7280"}
                  tick={{ fill: isDark ? "#9CA3AF" : "#6B7280" }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F7BFF"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                  dot={{
                    fill: "#4F7BFF",
                    strokeWidth: 2,
                    r: 4,
                    stroke: isDark ? "#1F2937" : "#FFFFFF",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#4F7BFF",
                    stroke: isDark ? "#1F2937" : "#FFFFFF",
                    strokeWidth: 3,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-blue-50"
              }`}
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Jami
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {data
                  .reduce((sum, item) => sum + item.value, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-blue-50"
              }`}
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                O'rtacha
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {Math.round(
                  data.reduce((sum, item) => sum + item.value, 0) / data.length
                ).toLocaleString()}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-blue-50"
              }`}
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Maksimal
              </p>
              <p
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {Math.max(...data.map((item) => item.value)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
