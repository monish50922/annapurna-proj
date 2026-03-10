import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Utensils, HandHeart, BarChart3 } from "lucide-react";
import type { AdminReport, User, Donation } from "@/types";

const AdminDashboard = () => {
  const [report, setReport] = useState<AdminReport | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
const filteredDonations =
  statusFilter === "ALL"
    ? donations
    : donations.filter((d) => d.status === statusFilter);
  useEffect(() => {
    Promise.all([
      api.get("/admin/report").then(({ data }) => setReport(data)).catch(() => {}),
      api.get("/admin/users").then(({ data }) => setUsers(Array.isArray(data) ? data : [])).catch(() => {}),
      api.get("/admin/donations").then(({ data }) => setDonations(Array.isArray(data) ? data : [])).catch(() => {})
    ]).finally(() => setLoading(false));
  }, []);

  const deleteDonation = async (id: number) => {
    if (!confirm("Delete this donation?")) return;

    try {
      await api.delete(`/admin/donations/${id}`);
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch {
      alert("Failed to delete donation");
    }
  };

  if (loading) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  const statCards = report
    ? [
        { icon: Users, label: "Total Users", value: report.totalUsers },
        { icon: Utensils, label: "Total Donations", value: report.totalDonations },
        { icon: HandHeart, label: "Claimed Donations", value: report.claimedDonations },
        {
          icon: BarChart3,
          label: "Available Donations",
          value: donations.filter((d) => d.status === "AVAILABLE").length
        }
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All User</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.id}</td>
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">
                    <Badge variant="outline">{u.role}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Donations</CardTitle>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="ALL">All</option>
            <option value="AVAILABLE">Available</option>
            <option value="CLAIMED">Claimed</option>
            <option value="PICKED">Picked</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2">ID</th>
                <th className="pb-2">Food</th>
                <th className="pb-2">Event</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Location</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDonations.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="py-2">{d.id}</td>
                  <td className="py-2">{d.food_type}</td>
                  <td className="py-2">{d.event_type || "N/A"}</td>
                  <td className="py-2">{d.quantity}</td>
                  <td className="py-2">{d.location}</td>

                  <td className="py-2">
                    <Badge variant="outline">{d.status}</Badge>
                  </td>

                  <td className="py-2">
                    <button
                      onClick={() => deleteDonation(d.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
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