"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryUseCase = void 0;
var DeleteCategoryUseCase;
(function (DeleteCategoryUseCase) {
    class UseCase {
        constructor(categoryRepo) {
            this.categoryRepo = categoryRepo;
        }
        async execute(input) {
            const entity = await this.categoryRepo.findById(input.id);
            await this.categoryRepo.delete(entity.id);
        }
    }
    DeleteCategoryUseCase.UseCase = UseCase;
})(DeleteCategoryUseCase = exports.DeleteCategoryUseCase || (exports.DeleteCategoryUseCase = {}));
