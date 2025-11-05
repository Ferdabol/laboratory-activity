import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'FerdO123',
  })
  readonly username: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123',
  })
  readonly password: string;
}