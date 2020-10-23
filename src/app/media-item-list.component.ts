import { Component, OnInit } from '@angular/core';
import { MediaItemService } from './media-item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css']
})
export class MediaItemListComponent implements OnInit {
  medium = '';
  mediaItems;

  constructor(private mediaItemService: MediaItemService,
    private activactedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activactedRoute.paramMap
    .subscribe(paramMap => {
      let medium = paramMap.get('medium');
      if (medium.toLowerCase() === 'all') {
        medium = '';
      }
      this.getMediaItems(medium);
    });
  }

  onMediaItemDelete(mediaItem) { 
    this.mediaItemService.delete(mediaItem)
    .subscribe(() => {
      this.getMediaItems(this.medium);
    });
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(medium)
      .subscribe(mediaItems => { 
        this.mediaItems = mediaItems;
      });
  }
}