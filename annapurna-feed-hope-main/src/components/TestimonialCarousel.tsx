import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "Annapurna helped us save 500+ meals from our wedding event.",
      name: "Event Organizer, Mumbai"
    },
    {
      quote: "Our restaurant now donates daily surplus effortlessly.",
      name: "Restaurant Owner"
    },
    {
      quote: "The platform connects us directly to donors nearby.",
      name: "NGO Volunteer"
    }
  ];

  return (
    <Swiper spaceBetween={30} slidesPerView={1} autoplay>
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl italic">“{t.quote}”</p>
            <p className="mt-4 text-sm opacity-80">— {t.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialCarousel;