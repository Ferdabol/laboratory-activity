import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Title of the note',
    example: 'Pangalan ng Note',
  })
  readonly title: string;

  @ApiProperty({
    description: 'Content of the note',
    example: 'Ito ang nilalaman ng aking tala.',
    required: false,
  })
  readonly content?: string;

  @ApiProperty({
    description: 'Owner username',
    example: 'ferd',
  })
  readonly username: string;
}