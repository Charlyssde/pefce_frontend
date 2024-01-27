import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';  
const routes: Routes = [
  {
    path: '',
    data: { title: 'Tasks' },
    children: [
      {
        path:'',
        component: TasksPageComponent,
        data: { title: 'Tasks', breadcrumb:[{label:'tasks',url:'/tareas'}]}
      }/*,

      {
        path:'nuevo',
        component: EnterprisesCreateComponent,
        data: { title: 'Empresas', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'nuevo',url:''}]}
      },
      {
        path:':empresaId/editar',
        component: EnterprisesUpdateComponent,
        data: { title: 'Empresas', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'editar',url:'/empresas/:empresaId/editar'}]}
      },
      {
        path:':empresaId/contactos',
        component: EnterpriseContactsPageComponent,
        data: { title: 'Contactos de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'contactos',url:'/empresas/:empresaId/contactos'}]}
      },
      {
        path:':empresaId/contactos/nuevo',
        component: EnterpriseContactsCreateComponent,
        data: { title: 'Nuevo contacto de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'contactos',url:'/empresas/:empresaId/contactos'},{label:'Nuevo',url:''}]}
      },
      {
        path:':empresaId/contactos/:contactoId/editar',
        component: EnterpriseContactsUpdateComponent,
        data: { title: 'Editar contactos de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'contactos',url:'/empresas/:empresaId/contactos'},{label:'{{contactoId}}',url:''},{label:'editar',url:'/empresas/:empresaId/contactos/:contactoId/editar'}]}
      },
      {
        path:':empresaId/imagen-comercial',
        component: EnterpriseTradeImageComponent,
        data: { title: 'Imagen comercial de la empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'imagen-comercial',url:'/empresas/:empresaId/imagen-comercial'}]}
      },
      {
        path:':empresaId/productos',
        component: EnterpriseProductPageComponent,
        data: { title: 'Productos de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'productos',url:'/empresas/:empresaId/productos'}]}
      },
      {
        path:':empresaId/productos/nuevo',
        component: EnterpriseProductCreateComponent,
        data: { title: 'Nuevo producto de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'productos',url:'/empresas/:empresaId/productos'},{label:'Nuevo',url:''}]}
      },
      {
        path:':empresaId/productos/:productoId/editar',
        component: EnterpriseProductUpdateComponent,
        data: { title: 'Editar producto de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'productos',url:'/empresas/:empresaId/productos'},{label:'{{productoId}}',url:''},{label:'editar',url:'/empresas/:empresaId/productos/:productoId/editar'}]}
      },
      {
        path:':empresaId/pabellon',
        component: EnterpriseStandComponent,
        data: { title: 'Pabellon de empresa', breadcrumb:[{label:'empresas',url:'/empresas'},{label:'{{empresaId}}',url:''},{label:'pabellon',url:'/empresas/:empresaId/pabellon'}]}
      },*/
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
