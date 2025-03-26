import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-dialogupdate',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule],
  templateUrl: './dialogupdate.component.html',
  styleUrl: './dialogupdate.component.css'
})
export class DialogupdateComponent {

  constructor(public dialogRef: MatDialogRef<DialogupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}