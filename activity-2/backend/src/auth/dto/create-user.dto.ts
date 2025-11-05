import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Ferd Olaira',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'FerdO123',
  })
  readonly username: string;

  @ApiProperty({
    description: 'Password for the account',
    example: 'SecurePassword123',
    minLength: 6,
  })
  readonly password: string;
}