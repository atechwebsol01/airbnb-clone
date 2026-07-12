"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      title={selected ? `Clear "${label}" filter` : `Filter by ${label}`}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-gold-400
        transition
        cursor-pointer
        shrink-0
        ${selected ? "border-b-gold-500" : "border-transparent"}
        ${selected ? "text-gold-500" : "text-neutral-400"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm whitespace-nowrap">{label}</div>
    </button>
  );
};

export default CategoryBox;
