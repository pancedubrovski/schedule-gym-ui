import { PagedListFilters } from "./paged-list-filters";

export interface PlaceFilters extends PagedListFilters {
    date?: string,
    startTime?: string,
    endTime?: string,
    city?: string,
    kind?: string;
    getFreeGyms?: any

}