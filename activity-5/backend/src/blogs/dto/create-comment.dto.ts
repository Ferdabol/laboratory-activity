import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment', example: 'Great post!' })
  content: string;

  @ApiProperty({ description: 'The ID of the user making the comment', example: 'user123' })
  userId: string;

  @ApiProperty({ description: 'The name of the user making the comment', example: 'John Doe' })
  userName: string;

  @ApiProperty({ description: 'The ID of the blog post being commented on', example: 'post123' })
  postId: string;
}