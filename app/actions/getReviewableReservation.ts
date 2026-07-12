import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
}

export default async function getReviewableReservation(params: IParams) {
  try {
    const { listingId, userId } = params;

    if (!listingId || !userId) {
      return null;
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        listingId,
        userId,
        endDate: { lt: new Date() },
        review: null,
      },
      orderBy: { endDate: "desc" },
    });

    if (!reservation) {
      return null;
    }

    return {
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
