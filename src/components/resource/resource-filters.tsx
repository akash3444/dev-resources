"use client";

import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "popularity", label: "Popularity" },
];

export const ResourceFilters = () => {
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "popularity",
    shallow: false,
  });
  const [query, setQuery] = useQueryState("q", {
    throttleMs: 340,
    shallow: false,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="mb-6 flex items-center gap-2">
      <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="relative">
        <SearchIcon className="absolute inset-y-0 left-2 my-auto h-5 w-5" />
        <Input
          className="w-[220px] pl-9"
          placeholder="Search resources..."
          value={query || ""}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
