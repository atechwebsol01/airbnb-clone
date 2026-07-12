"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      aria-pressed={selected}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        text-left
        text-neutral-200
        hover:border-gold-500
        transition
        cursor-pointer
        ${selected ? "border-gold-500 text-gold-400" : "border-ink-600"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </button>
  );
};

export default CategoryInput;
