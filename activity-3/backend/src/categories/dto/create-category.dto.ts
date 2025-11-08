import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category', example: 'Fiction' })
  name: string;

  @ApiProperty({ description: 'The description of the category', example: 'Books that contain fictional stories and narratives' })
  description: string;
}
