import prisma from "@/app/libs/prismadb";

export default async function getTopReviews() {
  try {
    const reviews = await prisma.review.findMany({
      take: 3,
      orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
        listing: {
          select: { id: true, title: true },
        },
      },
    });

    return reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));
  } catch (error: any) {
    return [];
  }
}
