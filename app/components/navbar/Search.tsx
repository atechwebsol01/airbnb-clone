"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <button
      type="button"
      onClick={searchModal.onOpen}
      aria-label="Search"
      className="
        border
        border-ink-600
        bg-ink-900
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:border-gold-500/50
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
            text-neutral-100
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x
            border-ink-600
            flex-1
            text-center
            text-neutral-100
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm
            pl-6
            pr-2
            text-neutral-400
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              p-2
              bg-gold-500
              rounded-full
              text-ink-950
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Search;
