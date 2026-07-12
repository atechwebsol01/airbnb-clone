import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import HomeHero from "@/app/components/HomeHero";
import Heading from "@/app/components/Heading";
import Testimonials from "@/app/components/Testimonials";
import ListingCard from "@/app/components/listings/ListingCard";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getTopReviews from "@/app/actions/getTopReviews";
import ClientOnly from "./components/ClientOnly";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const hasFilters = Object.keys(searchParams).length > 0;
  const topReviews = hasFilters ? [] : await getTopReviews();

  const stats = {
    homes: listings.length,
    reviews: listings.reduce((sum, l) => sum + l.reviewCount, 0),
    destinations: new Set(listings.map((l) => l.locationValue)).size,
  };

  const hero = !hasFilters && (
    <div className="-mt-28">
      <HomeHero stats={stats} />
    </div>
  );

  if (listings.length === 0) {
    return (
      <ClientOnly>
        {hero}
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      {hero}
      <Container>
        {!hasFilters && (
          <div className="pt-16 pb-2">
            <Heading
              title="Featured stays"
              subtitle="Handpicked homes from around the world"
            />
          </div>
        )}
        <div
          className={`
            ${hasFilters ? "pt-24" : "pt-8"}
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          `}
        >
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
        {!hasFilters && <Testimonials reviews={topReviews} />}
      </Container>
    </ClientOnly>
  );
};

export default Home;
