import React from "react";

export type Filter = {
    category: string;
    minPrice: number;
};

export type FilterContextType = {
    filtersContext: Filter,
    setFiltersContext: React.Dispatch<React.SetStateAction<Filter>>
}