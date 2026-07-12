"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium text-neutral-100">{title}</div>
        <div className="font-light text-neutral-400">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={onReduce}
          aria-label={`Decrease ${title}`}
          className="
            w-10
            h-10
            rounded-full
            border
            border-ink-600
            flex
            items-center
            justify-center
            text-neutral-300
            cursor-pointer
            hover:border-gold-500
            hover:text-gold-400
            transition
          "
        >
          <AiOutlineMinus />
        </button>
        <div
          className="
            font-light
            text-xl
            text-neutral-100
          "
        >
          {value}
        </div>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Increase ${title}`}
          className="
            w-10
            h-10
            rounded-full
            border
            border-ink-600
            flex
            items-center
            justify-center
            text-neutral-300
            cursor-pointer
            hover:border-gold-500
            hover:text-gold-400
            transition
          "
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
