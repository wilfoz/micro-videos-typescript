import { SearchResult } from '../../domain/repository/repository-contracts';

export type PaginationOutputDto<Items = any> = {
    items: Items[],
    total: number,
    current_page: number,
    last_page: number,
    per_page: number,
}

export class PaginationOutputMapper {
    static toOutput(_result: SearchResult): Omit<PaginationOutputDto, 'items'> {
        return {
            total: _result.total,
            current_page: _result.current_page,
            last_page: _result.last_page,
            per_page: _result.per_page,
        }
     }
}