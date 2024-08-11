import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileUploadService } from './file-upload.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() postData: { title: string; content: string },
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ): Promise<PostEntity> {
    let imagePath = null;
    if (file) {
      imagePath = await this.fileUploadService.uploadFile(file);
    }
    return this.postsService.create(postData.title, postData.content, imagePath, req.user);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() postData: { title: string; content: string },
    @UploadedFile() file: Express.Multer.File
  ): Promise<PostEntity> {
    let imagePath = null;
    if (file) {
      imagePath = await this.fileUploadService.uploadFile(file);
    }
    return this.postsService.update(+id, postData.title, postData.content, imagePath);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(+id);
  }
}