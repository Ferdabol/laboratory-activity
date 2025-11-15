import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book', example: 'The Great Gatsby' })
  title: string;

  @ApiProperty({ description: 'The author of the book', example: 'F. Scott Fitzgerald' })
  author: string;

  @ApiProperty({ description: 'The publication year', example: 1925 })
  year: number;

  @ApiProperty({ description: 'The genre of the book', example: 'Fiction' })
  genre: string;
}
