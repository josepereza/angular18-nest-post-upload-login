import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(title: string, content: string, imagePath: string, user: User): Promise<Post> {
    console.log(title,content,imagePath,user)
    const post = this.postsRepository.create({ title, content, imagePath, user });
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, title: string, content: string, imagePath: string): Promise<Post> {
    const post = await this.findOne(id);
    post.title = title;
    post.content = content;
    if (imagePath) post.imagePath = imagePath;
    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}