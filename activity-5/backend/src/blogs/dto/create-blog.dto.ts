import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ description: 'The title of the blog post', example: 'My First Blog Post' })
  title: string;

  @ApiProperty({ description: 'The content of the blog post', example: 'This is the content of my blog post...' })
  content: string;

  @ApiProperty({ description: 'The category of the blog post', example: 'Technology' })
  category: string;

  @ApiProperty({ description: 'The image URL for the blog post', example: 'https://example.com/image.jpg', required: false })
  image?: string;

  @ApiProperty({ description: 'The ID of the author', example: 'user123' })
  authorId: string;

  @ApiProperty({ description: 'The name of the author', example: 'John Doe' })
  authorName: string;
}