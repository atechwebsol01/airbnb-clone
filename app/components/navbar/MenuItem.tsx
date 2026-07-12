"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        text-left
        px-4
        py-3
        text-neutral-200
        hover:bg-ink-800
        hover:text-gold-400
        transition
        font-semibold
      "
    >
      {label}
    </button>
  );
};

export default MenuItem;
