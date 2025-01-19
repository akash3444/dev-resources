import { Search } from "lucide-react";

interface NoResultsFoundProps {
  searchQuery: string;
}

export function NoResourcesFound({ searchQuery }: NoResultsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Search className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">
        No results found
      </h2>
      <p className="mb-4 text-gray-600">
        We couldn&apos;t find any results for the search query:
      </p>
      <p className="mb-4 text-lg font-medium text-blue-600">
        &quot;{searchQuery}&quot;
      </p>
      <p className="text-gray-600">
        Try adjusting your search. Here are some ideas:
      </p>
      <ul className="mt-2 list-disc text-left text-gray-600">
        <li>Make sure all words are spelled correctly</li>
        <li>Try different keywords</li>
        <li>Try more general keywords</li>
        <li>Try fewer keywords</li>
      </ul>
    </div>
  );
}
