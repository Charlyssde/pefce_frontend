import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesCreateComponent } from './pages/profiles-create/profiles-create.component';
import { ProfilesOrganizationPageComponent } from './pages/profiles-organization-page/profiles-organization-page.component';
import { ProfilesPageComponent } from './pages/profiles-page/profiles-page.component';
import { ProfilesUpdateComponent } from './pages/profiles-update/profiles-update.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Perfiles' },
    children: [
      { 
        path: '', 
        component: ProfilesPageComponent, 
        data: { title:"Perfiles",breadcrumb:[{label:'perfiles',url:'/perfiles'},]} 
      },
      {
        path:'organigrama',
        component: ProfilesOrganizationPageComponent,
        data: { title:"Organigrama",breadcrumb:[{label:"perfiles",url:'/perfiles'},{label:'organigrama',url:''}] }
      },
      { 
        path: 'nuevo', 
        component: ProfilesCreateComponent, 
        data: { title:"Perfiles",breadcrumb:[{label:'perfiles',url:'/perfiles'},{label:'nuevo',url:''}]} 
      },
      { 
        path: ':perfilId/editar', 
        component: ProfilesUpdateComponent, 
        data: { title:"Perfiles",breadcrumb:[{label:'perfiles',url:'/perfiles'},{label:'{{perfilId}}',url:''},{label:'editar',url:''}]} 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
