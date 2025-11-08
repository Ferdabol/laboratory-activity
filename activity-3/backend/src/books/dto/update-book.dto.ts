import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ description: 'The title of the book', example: 'The Great Gatsby', required: false })
  title?: string;

  @ApiProperty({ description: 'The author of the book', example: 'F. Scott Fitzgerald', required: false })
  author?: string;

  @ApiProperty({ description: 'The publication year', example: 1925, required: false })
  year?: number;

  @ApiProperty({ description: 'The genre of the book', example: 'Fiction', required: false })
  genre?: string;
}