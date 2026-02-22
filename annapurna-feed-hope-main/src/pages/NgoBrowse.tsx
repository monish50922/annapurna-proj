import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StatusBadge from '@/components/StatusBadge';
import { Search, Utensils, Clock, MapPin, HandHeart, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Donation } from '@/types';

const NgoBrowse = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [claiming, setClaiming] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchDonations = () => {
    setLoading(true);
    api.get('/donations')
      .then(({ data }) => setDonations(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDonations(); }, []);

  const claimDonation = async (id: number) => {
    setClaiming(id);
    try {
      await api.put(`/donations/${id}/claim`);
      toast({
        title: 'Donation claimed!',
        description: 'You have successfully claimed this donation.'
      });
      fetchDonations();
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to claim',
        variant: 'destructive'
      });
    } finally {
      setClaiming(null);
    }
  };

  const filtered = donations.filter(d =>
    d.status === 'AVAILABLE' &&
    (d.food_type.toLowerCase().includes(search.toLowerCase()) ||
     d.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold">Browse Donations</h1>
        <p className="text-muted-foreground">Find and claim available food donations</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by food type or location..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <Utensils className="mx-auto mb-3 h-12 w-12 opacity-40" />
          <p className="text-lg">No available donations found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <Card key={d.id} className="hover-lift">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-display text-lg">
                    {d.food_type}
                  </CardTitle>
                  <StatusBadge status={d.status} />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-muted-foreground">

                  <p className="flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    {d.quantity}
                  </p>

                  {/* ⭐ EVENT TYPE ADDED */}
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Event: <span className="font-medium">{d.event_type || "N/A"}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {d.pickup_time}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {d.location}
                  </p>

                </div>

                <Button
                  className="w-full"
                  onClick={() => claimDonation(d.id)}
                  disabled={claiming === d.id}
                >
                  <HandHeart className="mr-2 h-4 w-4" />
                  {claiming === d.id ? 'Claiming...' : 'Claim Donation'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoBrowse;