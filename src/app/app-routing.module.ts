import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersettingComponent } from './pages/providersetting/providersetting.component';



const routes: Routes = [
  { path: 'providersetting', component: ProvidersettingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
