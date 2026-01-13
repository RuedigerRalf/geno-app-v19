export interface PagingParameter {
    filter: string;
    pageIndex: number;
    pageSize: number;
  }

  export interface NewPagingParameter {
    id: string;
    queryString: string;
    pageIndex: string;
    pageSize: string;
    pylon: string;
  }

  export interface PagedResponse<T>{
    pageNumber: number,
    totalPages: number,
    pageSize: number,
    totalCount: number,
    items: T[],
}