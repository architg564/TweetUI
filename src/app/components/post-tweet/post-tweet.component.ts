import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { TweetsService } from '../../services/tweets.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tweet',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './post-tweet.component.html',
  styleUrl: './post-tweet.component.css'
})
export class PostTweetComponent implements OnInit {
  constructor(private tweetService: TweetsService, private router: Router) { }

  ngOnInit(): void { }

  tweet = {
    username: '',
    message: '',
    time: '',
  };
  postTweet() {
    if (this.tweet.message == null || this.tweet.message == '') {
      alert('message required');
    } else {
      this.tweet.username = this.tweetService.getUsername()!;
      this.tweet.time = formatDate(new Date(), 'dd-MM-yyyy', 'en-US', '+0530');
      this.tweetService.saveTweet(this.tweet.username, this.tweet).subscribe(
        (response) => {
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}