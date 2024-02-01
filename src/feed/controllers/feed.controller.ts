import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}

    @Post()
    create(@Body() post: FeedPost): Observable<FeedPost> {
        return this.feedService.createPost(post);
    }

    // method = GET
    @Get()
    findAll(): Observable<FeedPost[]> {
        return this.feedService.findAllPosts();
    }
    
    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: FeedPost,
    ): Observable<UpdateResult> {
        return this.feedService.updatePost(id, feedPost);
    }

    @Delete(':id')
    delete( @Param('id') id: number): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
