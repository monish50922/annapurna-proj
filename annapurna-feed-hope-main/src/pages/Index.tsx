import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-food-sharing.jpg';
import impactStory1 from '@/assets/ngo1.png';
import impactStory2 from '@/assets/ngo2.png';
import impactStory3 from '@/assets/ngo3.png';
import AnimatedCounter from '@/components/AnimatedCounter';

import {
  Users,
  Utensils,
  Search,
  Truck,
  BarChart3,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] to-[#F3EADF] text-[#3A2E2A]">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        id="donate"
        className="bg-gradient-to-r from-[#E76F51] via-[#F4A261] to-[#F6A55A] text-white"
      >
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>
             <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-medium mb-6 backdrop-blur-md">
                Connecting Surplus with Need
              </span>

              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                No Plate Should <br /> Go Empty.
              </h1>

              <p className="mt-8 text-xl opacity-90 leading-relaxed max-w-xl">
                India wastes millions of tonnes of food every year while millions
                go hungry. Annapurna connects surplus food with communities in need.
              </p>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-[#4F7D5C] hover:bg-[#3e654a] text-white px-10 py-6 text-lg rounded-full"
                  >
                    Donate Food
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-white text-[#E76F51] hover:bg-white/90 px-10 py-6 text-lg rounded-full"
                  >
                    Join as NGO
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <img
                src={heroImage}
                alt="Food donation"
                className="rounded-3xl shadow-2xl"
              />

              <div className="absolute -bottom-6 -left-6 hidden md:block bg-white text-[#E76F51] px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-medium">Meals Saved</p>
                <p className="text-2xl font-bold">10,000+</p>
              </div>

              <div className="absolute -top-6 -right-6 hidden md:block bg-[#4F7D5C] text-white px-6 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-medium">NGOs Connected</p>
                <p className="text-2xl font-bold">150+</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Curved Divider */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#FAF7F2"
            d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,58.7C1120,43,1280,53,1360,58.7L1440,64V120H0Z"
          ></path>
        </svg>
      </div>

      {/* ================= ABOUT (STATS) ================= */}
      <section id="about" className="py-28 bg-[#FAF7F2]">
  <div className="container mx-auto px-6 max-w-4xl text-center">
    <h2 className="text-3xl md:text-4xl font-bold">
      About Annapurna
    </h2>

    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
      Annapurna was built with one mission — to ensure no edible food goes to waste
      while millions remain hungry. By connecting donors with NGOs through a simple
      digital platform, we turn surplus into sustenance.
    </p>

    <p className="mt-4 text-muted-foreground">
      Together, we build a more responsible and compassionate India.
    </p>
  </div>
</section>

      {/* ================= HOW IT WORKS ================= */}
<section id="how-it-works" className="py-28 bg-[#F1E9DF]">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-4xl font-bold">
      How Annapurna Works
    </h2>

    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
      A simple 3-step process that transforms surplus food into hope.
    </p>

    <div className="mt-16 relative">

      {/* Vertical Line (Desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-[#E76F51]/20 transform -translate-x-1/2"></div>

      <div className="space-y-16 md:space-y-24">

        {/* STEP 1 */}
        <div className="relative md:grid md:grid-cols-2 md:gap-12 items-center">
          
          <div className="md:text-right">
            <h3 className="text-2xl font-semibold text-[#E76F51]">
              01. Donate
            </h3>
            <p className="mt-4 text-muted-foreground">
              Individuals, restaurants, and event organizers list surplus food 
              with details like quantity, pickup time, and location.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="h-16 w-16 rounded-full bg-[#E76F51] text-white flex items-center justify-center text-xl font-bold shadow-lg">
              1
            </div>
          </div>

        </div>

        {/* STEP 2 */}
        <div className="relative md:grid md:grid-cols-2 md:gap-12 items-center">

          <div className="hidden md:flex justify-center order-2">
            <div className="h-16 w-16 rounded-full bg-[#E76F51] text-white flex items-center justify-center text-xl font-bold shadow-lg">
              2
            </div>
          </div>

          <div className="md:order-1">
            <h3 className="text-2xl font-semibold text-[#E76F51]">
              02. Claim
            </h3>
            <p className="mt-4 text-muted-foreground">
              Nearby NGOs browse available donations and instantly claim food 
              that matches their needs.
            </p>
          </div>

        </div>

        {/* STEP 3 */}
        <div className="relative md:grid md:grid-cols-2 md:gap-12 items-center">
          
          <div className="md:text-right">
            <h3 className="text-2xl font-semibold text-[#E76F51]">
              03. Deliver
            </h3>
            <p className="mt-4 text-muted-foreground">
              The food is picked up and delivered safely to communities in need,
              reducing waste and fighting hunger.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="h-16 w-16 rounded-full bg-[#4F7D5C] text-white flex items-center justify-center text-xl font-bold shadow-lg">
              ✓
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</section>

      {/* ================= GET INVOLVED (CTA) ================= */}
<section
  id="involved"
  className="relative overflow-hidden py-32 text-white"
>
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#E76F51] via-[#F4A261] to-[#4F7D5C] bg-fixed" />

  {/* Floating Glow Effects */}
  <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl animate-pulse"></div>

  <div className="relative container mx-auto px-6 text-center max-w-4xl">

    {/* Testimonial */}
    <div className="mb-16">
      <p className="text-xl md:text-2xl italic opacity-90">
        “Annapurna helped us redistribute over 500 meals after our annual event.
        What would have gone to waste fed entire families.”
      </p>
      <p className="mt-4 text-sm opacity-80">
        — Event Organizer, Mumbai
      </p>
    </div>

    {/* Headline */}
    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
      Join the Movement. <br />
      Feed the Future.
    </h2>

    <p className="mt-6 text-lg md:text-xl opacity-90">
      Every meal saved creates hope. Every action matters.
    </p>

    {/* Live Counters */}
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

      <div>
        <p className="text-3xl font-bold"><AnimatedCounter end={10000} suffix="+" /></p>
        <p className="text-sm opacity-80">Meals Saved</p>
      </div>

      <div>
        <p className="text-3xl font-bold"><AnimatedCounter end={500} suffix="+" /></p>
        <p className="text-sm opacity-80">Active Donors</p>
      </div>

      <div>
        <p className="text-3xl font-bold"><AnimatedCounter end={150} suffix="+" /></p>
        <p className="text-sm opacity-80">NGO Partners</p>
      </div>

      <div>
        <p className="text-3xl font-bold"><AnimatedCounter end={25} suffix="+" /></p>
        <p className="text-sm opacity-80">Cities Impacted</p>
      </div>

    </div>

    {/* CTA Buttons */}
    <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">

      <Link to="/register">
        <Button
          size="lg"
          className="bg-white text-[#E76F51] hover:bg-white/90 px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Donate Food
        </Button>
      </Link>

      <Link to="/register">
        <Button
          size="lg"
          className="bg-[#4F7D5C] hover:bg-[#3e654a] text-white px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Join as NGO
        </Button>
      </Link>

    </div>

    {/* Trust Badges */}
    <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-90 text-sm">

      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
        ✔ NGO Verified
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
        ✔ Secure Platform
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
        ✔ Zero Cost
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
        ✔ Community Driven
      </span>

    </div>

  </div>
</section>

      {/* ================= PLACEHOLDER SECTIONS ================= */}
<section id="impact" className="py-28 bg-[#FAF7F2]">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold">Impact Stories</h2>
    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
      Real food. Real change. Real lives impacted.
    </p>

    <div className="mt-14 grid gap-8 md:grid-cols-3">

      {[
        {
          title: "Wedding Surplus Saved",
          desc: "300 meals distributed to a local shelter after a community wedding.",
          img: impactStory1
        },
        {
          title: "Restaurant Partnership",
          desc: "Daily surplus redirected to 5 NGOs across the city.",
          img: impactStory2
        },
        {
          title: "Corporate Food Drive",
          desc: "500+ meals contributed during annual CSR campaign.",
          img: impactStory3
        }
      ].map((story, i) => (
        <Card
          key={i}
          className="overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <img
            src={story.img}
            alt={story.title}
            className="h-56 w-full object-cover"
          />
          <CardContent className="p-6 text-left">
            <h3 className="font-semibold text-lg">{story.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {story.desc}
            </p>
          </CardContent>
        </Card>
      ))}

    </div>
  </div>
</section>

<section id="faq" className="py-28 bg-[#F1E9DF]">
  <div className="container mx-auto px-6 max-w-3xl">
    <h2 className="text-3xl md:text-4xl font-bold text-center">
      Frequently Asked Questions
    </h2>

    <div className="mt-12 space-y-6">

      {[
        {
          q: "Who can donate food?",
          a: "Anyone with surplus edible food — households, events, restaurants, corporates."
        },
        {
          q: "How do NGOs claim donations?",
          a: "Registered NGOs can browse available food and claim instantly through the platform."
        },
        {
          q: "Is there any cost involved?",
          a: "No. Annapurna is built to connect communities and reduce waste at no cost."
        }
      ].map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold">{faq.q}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
        </div>
      ))}

    </div>
  </div>
</section>

<section id="contact" className="py-28 bg-[#FAF7F2]">
  <div className="container mx-auto px-6 max-w-2xl text-center">
    <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
    <p className="mt-4 text-muted-foreground">
      Have questions or want to partner with us? Contact us on +91 12345 67890 or email us at <a href="mailto:info@annapurna.com">info@annapurna.com</a>
    </p>

    
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Index;