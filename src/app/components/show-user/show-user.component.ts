import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.css'
})
export class ShowUserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'tweets'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        let currentUser = localStorage.getItem('user');
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let res of response) {
          if (res.username != currentUser) {
            this.userModel = this.userModel.filter(
              (res) => res.username !== currentUser
            );
          }
        }
        if (this.userModel.length == 0) {
          this.noUsersToDisplay = true;
        } else {
          this.noUsersToDisplay = false;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  userModel: {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    number: number,
  }[] = [];

  noUsersToDisplay: boolean = false;

  getDetails(username: string) {
    this.router.navigate(['/show-users/' + username]);
  }
}