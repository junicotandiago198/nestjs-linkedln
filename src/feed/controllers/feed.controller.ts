import { Body, Controller, Post } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}

    @Post()
    create(@Body() post: FeedPost): Observable<FeedPost> {
        return this.feedService.createPost(post);
    }
}
