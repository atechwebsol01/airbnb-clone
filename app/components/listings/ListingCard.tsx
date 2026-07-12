"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
        bg-ink-900
        border
        border-ink-700
        rounded-2xl
        overflow-hidden
        hover:border-gold-500/40
        hover:shadow-lg
        hover:shadow-black/40
        transition
      "
    >
      <div
        className="
          aspect-square
          w-full
          relative
          overflow-hidden
        "
      >
        <Image
          fill
          className="
            object-cover
            h-full
            w-full
            group-hover:scale-110
            transition
            duration-500
          "
          src={data.imageSrc}
          alt="Listing"
        />
        {data.reviewCount > 0 && (
          <div
            className="
              absolute
              top-3
              left-3
              bg-ink-950/80
              backdrop-blur-sm
              text-gold-400
              text-xs
              font-semibold
              px-2
              py-1
              rounded-full
              flex
              flex-row
              items-center
              gap-1
            "
          >
            <AiFillStar size={12} />
            {data.rating.toFixed(2)}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="font-semibold text-neutral-50 truncate">
          {data.title}
        </div>
        <div className="flex flex-row items-center gap-1 text-sm text-neutral-400">
          <HiOutlineLocationMarker size={14} />
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1 mt-1">
          <div className="font-semibold text-gold-500">$ {price}</div>
          {!reservation && <div className="font-light text-neutral-400">night</div>}
          {data.reviewCount > 0 && (
            <div className="font-light text-neutral-500 text-sm">
              ({data.reviewCount} {data.reviewCount === 1 ? "review" : "reviews"})
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <div className="mt-2">
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
