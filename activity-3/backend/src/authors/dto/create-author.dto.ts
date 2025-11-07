import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  birthYear: number;
}
