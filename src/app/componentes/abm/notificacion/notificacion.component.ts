import { Component, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  resultado: string
}

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent implements OnInit{
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  resultado = ""
  
  ngOnInit(){
    this.resultado = this.data.resultado
  }
}
