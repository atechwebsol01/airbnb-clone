import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json();
  const { listingId, reservationId, rating, comment } = body;

  if (!listingId || !reservationId) {
    return NextResponse.json(
      { error: "Missing listing or reservation." },
      { status: 400 }
    );
  }

  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return NextResponse.json(
      { error: "Rating must be a whole number between 1 and 5." },
      { status: 400 }
    );
  }

  if (typeof comment !== "string" || comment.trim().length < 1) {
    return NextResponse.json(
      { error: "Please write a short comment." },
      { status: 400 }
    );
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (
    !reservation ||
    reservation.userId !== currentUser.id ||
    reservation.listingId !== listingId ||
    reservation.endDate >= new Date()
  ) {
    return NextResponse.json(
      { error: "You can only review stays you've completed." },
      { status: 403 }
    );
  }

  try {
    const review = await prisma.review.create({
      data: {
        rating: numericRating,
        comment: comment.trim(),
        userId: currentUser.id,
        listingId,
        reservationId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "You've already reviewed this stay." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
