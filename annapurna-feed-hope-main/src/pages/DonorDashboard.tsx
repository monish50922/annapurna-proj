import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { PlusCircle, Utensils, Clock, MapPin, Calendar } from 'lucide-react';
import type { Donation } from '@/types';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/donor/donations')
      .then(({ data }) => setDonations(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const available = donations.filter(d => d.status === 'AVAILABLE').length;
  const claimed = donations.filter(d => d.status === 'CLAIMED').length;

  return (
    <div className="space-y-6 animate-fade-in-up">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground">Manage your food donations</p>
        </div>

        <Link to="/donor/new-donation">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Donation
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Donations</p>
            <p className="text-3xl font-bold">{donations.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-3xl font-bold">{available}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Claimed</p>
            <p className="text-3xl font-bold">{claimed}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : donations.length === 0 ? (
            <div className="py-8 text-center">No donations yet</div>
          ) : (
            <div className="space-y-3">
              {donations.slice(0, 5).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{d.food_type}</p>

                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Event: {d.event_type || 'N/A'}
                    </p>

                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Utensils className="h-3 w-3" />
                        {d.quantity}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {d.pickup_time}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {d.location}
                      </span>
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

export default DonorDashboard;