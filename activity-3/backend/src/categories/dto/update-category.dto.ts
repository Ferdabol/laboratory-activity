import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'The name of the category', example: 'Fiction', required: false })
  name?: string;

  @ApiProperty({ description: 'The description of the category', example: 'Books that contain fictional stories and narratives', required: false })
  description?: string;
}