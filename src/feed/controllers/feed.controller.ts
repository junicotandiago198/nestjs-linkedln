import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable, skip } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}

    @Post()
    create(@Body() feedPost: FeedPost): Observable<FeedPost> {
        return this.feedService.createPost(feedPost);
    }

    // method = GET = menampilkan seluruh data
    // @Get()
    // findAll(): Observable<FeedPost[]> {
    //     return this.feedService.findAllPosts();
    // }

    @Get()
    findSelected(@Query('take') take = 1, @Query('skip') skip = 1): Observable<FeedPost[]> {
        take = take > 20 ? 20 : take;
        return this.feedService.findPosts(take, skip);
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
