import { CategoryOutputMapper } from './category.output';
import { Category } from '../../domain/entities/category';
describe("CategoryOutputMapper", () => {
    it("should convert a category in output", () => {
        const created_at = new Date();
        const category = new Category({
            name: 'test',
            description: 'test',
            is_active: true,
            created_at,
        });

        const spyToJson = jest.spyOn(category, 'toJSON');
        const output = CategoryOutputMapper.toOutput(category);
        expect(spyToJson).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: category.id,
            name: 'test',
            description: 'test',
            is_active: true,
            created_at,
        });
    });
});