import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getReviewsByListingId(params: IParams) {
  try {
    const { listingId } = params;

    const reviews = await prisma.review.findMany({
      where: { listingId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
