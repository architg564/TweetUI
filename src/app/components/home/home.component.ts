import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsService } from '../../services/tweets.service';
import { DialogupdateComponent } from '../dialogupdate/dialogupdate.component';
import { DialogreplyComponent } from '../dialogreply/dialogreply.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  user: any;
  tweets: any;
  isUpdate: boolean = false;
  updateBody = {
    message: '',
  };
  isReply: boolean = false;
  replyBody = {
    username: '',
    comment: '',
  };
  tweet = {
    username: '',
    message: '',
    time: '',
  };
  constructor(private tweetService: TweetsService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.user = this.tweetService.getUsername();
    this.getTweetByUsername();
  }

  updateTweet(id: string, username: string) {
    const dialogRef = this.dialog.open(DialogupdateComponent, {
      width: '250px',
      data: { message: this.updateBody.message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == '') alert('empty tweet body');
      else {
        this.updateBody.message = result;
        this.tweetService.updateTweet(id, username, this.updateBody).subscribe(
          (response) => {
            const index = this.tweets.findIndex((twee: any) => twee.tweetId === id);
          if (index !== -1) {
            this.tweets[index] = response; // Update the specific tweet
          }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

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
      else {
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
        );
      }
    });
  }

  getTweetByUsername() {
    if (this.user != null || this.user != '') {
      this.tweetService.getTweetByUsername(this.user).subscribe(
        (response) => {
          this.tweets = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  delete(id: string, username: string) {

    this.tweetService.deleteTweet(id, username).subscribe(
      (response) => {
        this.tweets = this.tweets.filter((tweet: any) => tweet.tweetId !== id);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

 

  like(id: any) {
    this.tweetService
      .likeTweet(this.tweetService.getUsername()!, id.toLocaleString())
      .subscribe(
        (response) => {
          const tweet = this.tweets.find((t: any) => t.tweetId === id);
      if (tweet) {
        if (tweet.likes.includes(this.user)) {
          // Unlike: Remove username from likes
          tweet.likes = tweet.likes.filter((user: string) => user !== this.user);
        } else {
          // Like: Add username to likes
          tweet.likes.push(this.user);
        }
      }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  reply(id: any) {
    console.warn(id);
  }

  getTweets() {
    this.tweetService.getAllTweets().subscribe(
      (response) => {
        this.tweets = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}



// postTweet() {
//   this.tweet.username = this.tweetService.getUsername()!;
//   this.tweet.time = new Date().toLocaleString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: false,
//   });
//   this.tweetService.saveTweet(this.tweet.username, this.tweet).subscribe(
//     (response) => {
//       console.warn(response);
//       // location.reload();
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }