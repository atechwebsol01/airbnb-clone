"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
        bg-ink-900
        rounded-2xl
        border
        border-ink-700
        overflow-hidden
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          gap-1
          p-4
        "
      >
        <div className="text-2xl font-semibold text-gold-500">
          $ {price}
        </div>
        <div className="font-light text-neutral-400">night</div>
      </div>
      <hr className="border-ink-700" />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr className="border-ink-700" />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr className="border-ink-700" />
      <div
        className="
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
