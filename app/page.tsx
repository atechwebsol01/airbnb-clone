import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import HomeHero from "@/app/components/HomeHero";
import ListingCard from "@/app/components/listings/ListingCard";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const hasFilters = Object.keys(searchParams).length > 0;

  const hero = !hasFilters && (
    <div className="-mt-28">
      <HomeHero />
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
        <div
          className={`
            ${hasFilters ? "pt-24" : "pt-12"}
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
      </Container>
    </ClientOnly>
  );
};

export default Home;
