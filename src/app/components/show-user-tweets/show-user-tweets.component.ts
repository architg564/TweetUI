import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from '../../services/tweets.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogreplyComponent } from '../dialogreply/dialogreply.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-show-user-tweets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './show-user-tweets.component.html',
  styleUrl: './show-user-tweets.component.css'
})
export class ShowUserTweetsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private tweetService: TweetsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  username: any;
  tweets: any;
  getDetails() {
    this.activatedRoute.params.subscribe(
      (parameter) => (this.username = parameter['username'])
    );
    this.tweetService.getTweetByUsername(this.username).subscribe(
      (response) => {
        this.tweets = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isReply: boolean = false;
  replyBody = {
    username: '',
    comment: '',
  };
  replyTweet(id: string, username: string) {
    const dialogRef = this.dialog.open(DialogreplyComponent, {
      width: '250px',
      data: {
        username: this.replyBody.username,
        comment: this.replyBody.comment,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == '') alert('empty Comment');
      else{
        this.replyBody.comment = result;
      this.replyBody.username = localStorage.getItem('username')!;
      this.tweetService.replyTweet(id, username, this.replyBody).subscribe(
        (response) => {
          const index = this.tweets.findIndex((twee: any) => twee.tweetId === id);
          if (index !== -1) {
            this.tweets[index] = response; // Update the specific tweet
          }
        },
        (error) => {
          console.error(error);
        }
      );}
    });
  }

  like(id: any) {
    const loggedUsername = this.tweetService.getUsername()!;
    this.tweetService
      .likeTweet(loggedUsername, id.toLocaleString())
      .subscribe(
        (response) => {
          const tweet = this.tweets.find((t: any) => t.tweetId === id);
      if (tweet) {
        if (tweet.likes.includes(loggedUsername)) {
          // Unlike: Remove username from likes
          tweet.likes = tweet.likes.filter((user: string) => user !== loggedUsername);
        } else {
          // Like: Add username to likes
          tweet.likes.push(loggedUsername);
        }
      }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}