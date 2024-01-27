import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersCreateComponent } from './pages/users-create/users-create.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersUpdateComponent } from './pages/users-update/users-update.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Usuarios' },
    children: [
      { 
        path: '', 
        component: UsersPageComponent, 
        data: { title:"Usuarios",breadcrumb:[{label:'usuarios',url:'/usuarios'},]} 
      },
      { 
        path: 'nuevo', 
        component: UsersCreateComponent, 
        data: { title:"Usuarios",breadcrumb:[{label:'usuarios',url:'/usuarios'},{label:'nuevo',url:''}]} 
      },
      { 
        path: ':usuarioId/editar', 
        component: UsersUpdateComponent, 
        data: { title:"Usuarios",breadcrumb:[{label:'usuarios',url:'/usuarios'},{label:'{{usuarioId}}',url:''},{label:'editar',url:''}]} 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
