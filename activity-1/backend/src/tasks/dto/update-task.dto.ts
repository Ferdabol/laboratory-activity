import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Updated title of the task',
    example: 'Maghugas ng pinggan',
  })
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'Whether the task is completed',
    example: true,
  })
  readonly completed?: boolean;
}
