import { CategoryRepository } from '#category/repository/category.repository';
import { CategoryOutput } from '../dto/category.output';
import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';
import { SearchInputDto } from '#seedwork/application/dto/search-input';
import { PaginationOutputDto } from '#seedwork/application/dto/pagination-output';
export declare namespace ListCategoriesUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
        private toOutput;
    }
    type Input = SearchInputDto;
    type Output = PaginationOutputDto<CategoryOutput>;
}
