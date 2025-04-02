import { Routes } from '@angular/router';
import { AbmMateriaComponent } from './componentes/abm/abm-materia/abm-materia.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AbmPlanComponent } from './componentes/abm/abm-plan/abm-plan.component';
import { AbmAlumnoComponent } from './componentes/abm/abm-alumno/abm-alumno.component';

export const routes: Routes = [
    {path: 'ABM/Materia', component: AbmMateriaComponent},
    {path: 'ABM/Plan', component: AbmPlanComponent},
    {path: 'ABM/Alumno', component: AbmAlumnoComponent},
    {path: '', component: PrincipalComponent}];
