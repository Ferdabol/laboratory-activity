import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'The name of the author', example: 'F. Scott Fitzgerald' })
  name: string;

  @ApiProperty({ description: 'The biography of the author', example: 'An American novelist and short story writer...' })
  bio: string;

  @ApiProperty({ description: 'The birth year of the author', example: 1896 })
  birthYear: number;
}
