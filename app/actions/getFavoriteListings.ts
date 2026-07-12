import prisma from "@/app/libs/prismadb";
import withRating from "@/app/libs/withRating";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
      include: {
        reviews: { select: { rating: true } },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...withRating(favorite),
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
