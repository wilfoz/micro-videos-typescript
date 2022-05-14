"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationOutputMapper = void 0;
class PaginationOutputMapper {
    static toOutput(_result) {
        return {
            total: _result.total,
            current_page: _result.current_page,
            last_page: _result.last_page,
            per_page: _result.per_page,
        };
    }
}
exports.PaginationOutputMapper = PaginationOutputMapper;
