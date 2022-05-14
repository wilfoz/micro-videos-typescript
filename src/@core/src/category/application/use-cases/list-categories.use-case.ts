import { CategoryRepository } from '#category/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category.output';
import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';
import { SearchInputDto } from '#seedwork/application/dto/search-input';
import { PaginationOutputDto, PaginationOutputMapper } from '#seedwork/application/dto/pagination-output';

export namespace ListCategoriesUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private categoryRepo: CategoryRepository.Repository) { }

        async execute(input: Input): Promise<Output> {
            const params = new CategoryRepository.SearchParams(input);
            const searchResult = await this.categoryRepo.search(params);
            return this.toOutput(searchResult);
        }

        private toOutput(searchResult: CategoryRepository.SearchResult): Output {
            const items = searchResult.items.map(item => CategoryOutputMapper.toOutput(item));
            const pagination = PaginationOutputMapper.toOutput(searchResult);
            return {
                items,
                ...pagination
            }
        }
    }

    //DTO - Data transfer Object || Boundary

    export type Input = SearchInputDto;

    export type Output = PaginationOutputDto<CategoryOutput>;
}
