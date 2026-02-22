import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { HandHeart, Utensils, Clock, MapPin } from 'lucide-react';
import type { Donation } from '@/types';

const NgoDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FIXED: fetch claimed donations from correct endpoint
  const fetchClaimed = () => {
    setLoading(true);
    api.get('/donations/claimed')
      .then(({ data }) => {
        setDonations(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClaimed();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome, {user?.name} 🤝</h1>
        <p className="text-muted-foreground">Track your claimed donations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="hover-lift">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Claimed Donations</p>
            <p className="font-display text-3xl font-bold text-primary">{donations.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Claimed Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : donations.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <HandHeart className="mx-auto mb-2 h-10 w-10 opacity-40" />
              <p>No claimed donations yet. Browse available donations!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {donations.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg border p-4 hover-lift">
                  <div className="space-y-1">
                    <p className="font-semibold">{d.food_type}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Utensils className="h-3 w-3" />{d.quantity}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{d.pickup_time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{d.location}</span>
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NgoDashboard;
