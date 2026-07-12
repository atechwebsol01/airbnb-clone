import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import getReviewsByListingId from "@/app/actions/getReviewsByListingId";
import getReviewableReservation from "@/app/actions/getReviewableReservation";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const reviews = await getReviewsByListingId(params);
  const reviewableReservation = await getReviewableReservation({
    listingId: params.listingId,
    userId: currentUser?.id,
  });

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        reviews={reviews}
        reviewableReservation={reviewableReservation}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
