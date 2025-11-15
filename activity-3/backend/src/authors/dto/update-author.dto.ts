import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({ description: 'The name of the author', example: 'F. Scott Fitzgerald', required: false })
  name?: string;

  @ApiProperty({ description: 'The biography of the author', example: 'An American novelist and short story writer...', required: false })
  bio?: string;

  @ApiProperty({ description: 'The birth year of the author', example: 1896, required: false })
  birthYear?: number;
}