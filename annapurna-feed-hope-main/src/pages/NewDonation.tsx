import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Utensils, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewDonation = () => {

  const [form, setForm] = useState({
    food_type: '',
    quantity: '',
    quantity_unit: 'meals',
    pickup_time: '',
    location: '',
    event_type: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [minDateTime, setMinDateTime] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  // Set current time as minimum selectable time
  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60000)
      .toISOString()
      .slice(0, 16);

    setMinDateTime(localTime);
    setForm(prev => ({ ...prev, pickup_time: localTime }));
  }, []);

  const validate = () => {

    const newErrors: any = {};

    if (!form.food_type.trim()) {
      newErrors.food_type = 'Food type is required';
    } else if (form.food_type.length < 3) {
      newErrors.food_type = 'Food type must be at least 3 characters';
    }

    if (!form.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    }

    if (!form.event_type) {
      newErrors.event_type = 'Please select an event type';
    }

    if (!form.pickup_time) {
      newErrors.pickup_time = 'Pickup time is required';
    }

    if (!form.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (form.location.length < 5) {
      newErrors.location = 'Enter a valid location';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      await api.post('/donations', form);

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
                />

              </div>

              {errors.food_type && (
                <p className="text-sm text-red-500">{errors.food_type}</p>
              )}

            </div>

            {/* Quantity */}
            <div className="space-y-2">

              <Label htmlFor="quantity">Quantity</Label>

              <div className="flex gap-2">

                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Number"
                  value={form.quantity}
                  onChange={update('quantity')}
                />

                <select
                  className="rounded-md border bg-background p-2 text-sm"
                  value={form.quantity_unit}
                  onChange={update('quantity_unit')}
                >
                  <option value="meals">Meals</option>
                  <option value="kg">Kg</option>
                  <option value="plates">Plates</option>
                </select>

              </div>

              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity}</p>
              )}

            </div>

            {/* Event Type */}
            <div className="space-y-2">

              <Label htmlFor="event_type">Event Type</Label>

              <select
                id="event_type"
                className="w-full rounded-md border bg-background p-2 text-sm"
                value={form.event_type}
                onChange={update('event_type')}
              >

                <option value="">Select event type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Temple Event">Temple Event</option>
                <option value="Party">Party</option>
                <option value="Other">Other</option>

              </select>

              {errors.event_type && (
                <p className="text-sm text-red-500">{errors.event_type}</p>
              )}

            </div>

            {/* Pickup Time */}
            <div className="space-y-2">

              <Label htmlFor="pickup_time">Pickup Time</Label>

              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  id="pickup_time"
                  type="datetime-local"
                  className="pl-9"
                  min={minDateTime}
                  value={form.pickup_time}
                  onChange={update('pickup_time')}
                />

              </div>

              {errors.pickup_time && (
                <p className="text-sm text-red-500">{errors.pickup_time}</p>
              )}

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
                />

              </div>

              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}

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