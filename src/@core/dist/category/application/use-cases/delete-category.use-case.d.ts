import { CategoryRepository } from '#category/repository/category.repository';
import { UseCase as DefaultUseCase } from '#seedwork/application/use-case';
export declare namespace DeleteCategoryUseCase {
    class UseCase implements DefaultUseCase<Input, Output> {
        private categoryRepo;
        constructor(categoryRepo: CategoryRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    type Input = {
        id: string;
    };
    type Output = void;
}
