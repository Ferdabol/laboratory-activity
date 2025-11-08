import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // Blog Post Endpoints
  @Post()
  @ApiOperation({ summary: 'Create a new blog post', description: 'Creates a new blog post in the database' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'The blog post has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createPost(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createPost(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts', description: 'Retrieves all blog posts from the database' })
  @ApiResponse({ status: 200, description: 'Returns an array of all blog posts.' })
  getAllPosts() {
    return this.blogsService.getAllPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID', description: 'Retrieves a single blog post by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post', type: String })
  @ApiResponse({ status: 200, description: 'Returns the blog post with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  getPostById(@Param('id') id: string) {
    return this.blogsService.getPostById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog post', description: 'Updates an existing blog post by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post to update', type: String })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  updatePost(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updatePost(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post', description: 'Deletes a blog post and its comments from the database' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the blog post to delete', type: String })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Blog post not found.' })
  deletePost(@Param('id') id: string) {
    return this.blogsService.deletePost(id);
  }

  // Comment Endpoints
  @Post('comments')
  @ApiOperation({ summary: 'Create a new comment', description: 'Creates a new comment on a blog post' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.blogsService.createComment(createCommentDto);
  }

  @Get(':postId/comments')
  @ApiOperation({ summary: 'Get comments for a blog post', description: 'Retrieves all comments for a specific blog post' })
  @ApiParam({ name: 'postId', description: 'The unique identifier of the blog post', type: String })
  @ApiResponse({ status: 200, description: 'Returns an array of comments for the blog post.' })
  getCommentsByPostId(@Param('postId') postId: string) {
    return this.blogsService.getCommentsByPostId(postId);
  }

  @Delete('comments/:commentId/:postId')
  @ApiOperation({ summary: 'Delete a comment', description: 'Deletes a comment from a blog post' })
  @ApiParam({ name: 'commentId', description: 'The unique identifier of the comment to delete', type: String })
  @ApiParam({ name: 'postId', description: 'The unique identifier of the blog post', type: String })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  deleteComment(@Param('commentId') commentId: string, @Param('postId') postId: string) {
    return this.blogsService.deleteComment(commentId, postId);
  }
}