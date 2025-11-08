import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({ description: 'The title of the blog post', example: 'My Updated Blog Post', required: false })
  title?: string;

  @ApiProperty({ description: 'The content of the blog post', example: 'This is the updated content...', required: false })
  content?: string;

  @ApiProperty({ description: 'The category of the blog post', example: 'Technology', required: false })
  category?: string;

  @ApiProperty({ description: 'The image URL for the blog post', example: 'https://example.com/image.jpg', required: false })
  image?: string;
}