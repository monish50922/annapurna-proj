import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { login } = useAuth();
  const { toast } = useToast();

  const validate = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await login(email, password);

      toast({
        title: 'Welcome back!',
        description: 'You have logged in successfully.',
      });

    } catch (err: any) {
      toast({
        title: 'Login failed',
        description: err.response?.data?.message || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left side - branding */}
      <div className="hidden lg:flex flex-col justify-center items-center gradient-hero p-12">
        <div className="max-w-md text-center animate-fade-in-up">

          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Welcome Back to Annapurna
          </h1>

          <p className="text-primary-foreground/80 font-serif text-lg">
            Continue your journey of sharing food and hope with communities in need.
          </p>

        </div>
      </div>

      {/* Right side - form */}
      <div className="flex items-center justify-center p-6 bg-background">

        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">

          <CardHeader className="text-center">
            <Link
              to="/"
              className="mx-auto font-display text-2xl font-bold text-primary mb-2 lg:hidden"
            >
              ANNAPURNA
            </Link>

            <CardTitle className="font-display text-2xl">
              Sign In
            </CardTitle>

            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">

                <Label htmlFor="email">Email</Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}

              </div>

              {/* Password */}
              <div className="space-y-2">

                <Label htmlFor="password">Password</Label>

                <div className="relative">

                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}

              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">

              Don't have an account?{' '}

              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Register here
              </Link>

            </p>

          </CardContent>

        </Card>

      </div>

    </div>
  );
};

export default Login;