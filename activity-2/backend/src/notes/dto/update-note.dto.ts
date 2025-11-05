import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    description: 'Title of the note',
    example: 'Updated Note Title',
    required: false,
  })
  readonly title?: string;

  @ApiProperty({
    description: 'Content of the note',
    example: 'Updated note content here.',
    required: false,
  })
  readonly content?: string;

  @ApiProperty({
    description: 'Owner username',
    example: 'ferd',
    required: true,
  })
  readonly username: string;
}