import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Utensils, HandHeart, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { AdminReport, User, Donation } from "@/types";

const PIE_COLORS = ["#22c55e", "#f97316"];

const AdminDashboard = () => {
  const [report, setReport] = useState<AdminReport | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get("/admin/report").then(({ data }) => setReport(data)),
      api.get("/admin/users").then(({ data }) => setUsers(Array.isArray(data) ? data : [])),
      api.get("/admin/donations").then(({ data }) => setDonations(Array.isArray(data) ? data : [])),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-12 text-center">Loading...</div>;

  const stats = report ? [
    { icon: Users, label: "Users", value: report.total_users },
    { icon: Utensils, label: "Donations", value: report.total_donations },
    { icon: HandHeart, label: "Claimed", value: report.claimed_donations },
    { icon: BarChart3, label: "Available", value: report.available_donations },
  ] : [];

  const pieData = report ? [
    { name: "Claimed", value: report.claimed_donations },
    { name: "Available", value: report.available_donations },
  ] : [];

  const barData = donations.reduce((acc: any[], d) => {
    const found = acc.find(x => x.food === d.food_type);
    if (found) found.count++;
    else acc.push({ food: d.food_type, count: 1 });
    return acc;
  }, []);

  return (
    <div className="space-y-10 animate-fade-in-up">

      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-primary/80 to-orange-400 p-6 text-white shadow">
        <h1 className="text-3xl font-bold">Admin Control Panel</h1>
        <p className="opacity-90">Live donation analytics</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="hover:-translate-y-1 hover:shadow-xl transition">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold">{s.value}</p>
              </div>
              <s.icon className="h-9 w-9 opacity-40" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Interactive Pie */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Donation Status</h2>

            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={100}
                  activeIndex={activeIndex}
                  onMouseEnter={(_, i) => setActiveIndex(i)}
                  animationDuration={700}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <div className="text-center text-sm text-muted-foreground mt-2">
              Hover slices for details
            </div>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Food Distribution</h2>
<ResponsiveContainer width="100%" height={280}>
  <BarChart data={barData}>
    <XAxis dataKey="food" />
    <YAxis />
    <Tooltip />

    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
      {barData.map((_, index) => (
        <Cell
          key={index}
          fill={[
            "#22c55e", // green
            "#f97316", // orange
            "#3b82f6", // blue
            "#ec4899", // pink
            "#a855f7", // purple
          ][index % 5]}
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Users */}
      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <h2 className="font-semibold mb-3">Users</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-muted/40">
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><Badge variant="outline">{u.role}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminDashboard;