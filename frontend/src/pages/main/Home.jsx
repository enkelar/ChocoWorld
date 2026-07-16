import { HeroSection } from '../../components/sections/HeroSection';
import { FeaturedSection } from '../../components/sections/FeaturedSection';
import { StorySection } from '../../components/sections/StorySection';
import { ContactSection } from '../../components/sections/ContactSection';
import { useFeaturedProducts } from '../../hooks/useProducts';

export function Home() {
  const { data: featured, isLoading } = useFeaturedProducts();

  return (
    <div>
      <HeroSection />
      <FeaturedSection products={featured ?? []} isLoading={isLoading}  />
      <StorySection />
      <ContactSection />
    </div>
  );
}

export default Home;
