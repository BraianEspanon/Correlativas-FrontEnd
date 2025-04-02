import { Component, OnInit, Input } from '@angular/core';
import { Materia } from '../../entidades/Materia';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})

export class MateriasComponent implements OnInit {
  @Input() materia : Materia = {} as Materia;

  ngOnInit(): void {
  }

}
