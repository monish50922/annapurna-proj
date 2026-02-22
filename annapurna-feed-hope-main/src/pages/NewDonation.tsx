import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Utensils, Package, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewDonation = () => {
  const [form, setForm] = useState({
    food_type: '',
    quantity: '',
    pickup_time: '',
    location: '',
    event_type: '',   // ⭐ ADDED
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/donations', form);  // event_type automatically included
      toast({
        title: 'Donation created!',
        description: 'Your food donation has been listed.',
      });
      navigate('/donor/dashboard');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to create donation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const update =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="mx-auto max-w-lg animate-fade-in-up">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-display text-2xl">
            Create Donation
          </CardTitle>
          <CardDescription>
            Share your surplus food with those in need
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Food Type */}
            <div className="space-y-2">
              <Label htmlFor="food_type">Food Type</Label>
              <div className="relative">
                <Utensils className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="food_type"
                  placeholder="e.g., Rice, Curry, Bread"
                  className="pl-9"
                  value={form.food_type}
                  onChange={update('food_type')}
                  required
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="quantity"
                  placeholder="e.g., 50 meals, 10 kg"
                  className="pl-9"
                  value={form.quantity}
                  onChange={update('quantity')}
                  required
                />
              </div>
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <Label htmlFor="event_type">Event Type</Label>
              <select
                id="event_type"
                className="w-full rounded-md border bg-background p-2 text-sm"
                value={form.event_type}
                onChange={update('event_type')}
                required
              >
                <option value="">Select event type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Temple Event">Temple Event</option>
                <option value="Party">Party</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Pickup Time */}
            <div className="space-y-2">
              <Label htmlFor="pickup_time">Pickup Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup_time"
                  placeholder="e.g., Today 5:00 PM"
                  className="pl-9"
                  value={form.pickup_time}
                  onChange={update('pickup_time')}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Full address"
                  className="pl-9"
                  value={form.location}
                  onChange={update('location')}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Donation'}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDonation;