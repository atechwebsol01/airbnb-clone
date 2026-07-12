"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value: any) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme: any) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#D4AF37",
            primary25: "#242427",
            primary50: "#3D310A",
            neutral0: "#1A1A1D",
            neutral5: "#1A1A1D",
            neutral10: "#333336",
            neutral20: "#333336",
            neutral30: "#4D4D50",
            neutral40: "#8A8A8D",
            neutral50: "#8A8A8D",
            neutral60: "#C9C9C9",
            neutral70: "#E5E5E5",
            neutral80: "#F2F0EB",
            neutral90: "#F2F0EB",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
