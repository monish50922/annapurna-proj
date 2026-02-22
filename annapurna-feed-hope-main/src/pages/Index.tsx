import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  Utensils,
  ArrowRight,
  HandHeart,
  Search,
  Truck,
  BarChart3,
  Shield,
  Clock,
} from 'lucide-react';

const stats = [
  { icon: Utensils, value: '10,000+', label: 'Meals Donated' },
  { icon: Users, value: '500+', label: 'Active Donors' },
  { icon: HandHeart, value: '150+', label: 'NGO Partners' },
  { icon: BarChart3, value: '95%', label: 'Food Saved' },
];

const steps = [
  { icon: Heart, title: 'Donate Food', desc: 'List your surplus food with details like type, quantity, and pickup time.' },
  { icon: Search, title: 'NGOs Browse', desc: 'Nearby NGOs discover and claim donations that match their needs.' },
  { icon: Truck, title: 'Pickup & Deliver', desc: 'Coordinate pickup and deliver fresh food to communities in need.' },
];

const features = [
  { icon: Shield, title: 'Role-Based Access', desc: 'Secure dashboards for donors, NGOs, and administrators.' },
  { icon: Clock, title: 'Real-Time Tracking', desc: 'Track donation status from listing to delivery.' },
  { icon: BarChart3, title: 'Impact Reports', desc: 'Detailed analytics on food saved and communities served.' },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              🍛 Fighting Hunger, Reducing Waste
            </span>
          </div>
          <h1 className="animate-fade-in-up stagger-1 font-display text-4xl font-bold leading-tight md:text-6xl">
            Share Food,{' '}
            <span className="text-primary">Share Hope</span>
          </h1>
          <p className="animate-fade-in-up stagger-2 mt-6 text-lg text-muted-foreground font-serif md:text-xl">
            Annapurna connects surplus food from generous donors with NGOs serving communities in need. 
            Together, we can end food waste and hunger.
          </p>
          <div className="animate-fade-in-up stagger-3 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register">
              <Button size="lg" className="text-base px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-base px-8">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-y bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className={`animate-fade-in-up stagger-${i + 1} text-center`}>
              <s.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <p className="font-display text-2xl font-bold md:text-3xl">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mt-3 text-muted-foreground">Three simple steps to make a difference</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={i} className="hover-lift glass-card border-0 text-center">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="border-t bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Platform Features</h2>
          <p className="mt-3 text-muted-foreground">Built for impact and ease of use</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="hover-lift border">
              <CardContent className="pt-6">
                <f.icon className="mb-3 h-8 w-8 text-secondary" />
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="glass-card mx-auto max-w-2xl p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-4 text-muted-foreground font-serif">
            Join hundreds of donors and NGOs already using Annapurna to fight food waste and hunger.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Join as Donor <Heart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8">
                Join as NGO <HandHeart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
