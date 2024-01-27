import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageSystemComponent } from './pages/page-system/page-system.component';

const routes: Routes = [
  
  {
    path: '',
    data: { title: 'Sistema' },
    children: [
      { 
        path: '', 
        component: PageSystemComponent, 
        data: { 
          title: 'Sistema', 
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
