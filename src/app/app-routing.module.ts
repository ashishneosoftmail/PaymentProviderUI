import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersettingComponent } from './pages/providersetting/providersetting.component';
import { ProvidersettingsListComponent } from './pages/providersettings-list/providersettings-list.component';
import { ProvidersettingsUpdateComponent } from './pages/providersettings-update/providersettings-update.component';
import { ProviderSettingListComponent } from './components/provider-setting-list/provider-setting-list.component';
import { ProviderSettingFormComponent } from './components/provider-setting-form/provider-setting-form.component';
const routes: Routes = [
  { path: 'providersetting', component: ProvidersettingComponent },
  // { path: 'provider-list', component: ProvidersettingsListComponent },
  // { path: 'providerupdate', component: ProvidersettingsUpdateComponent },
  { path: 'provider-settings', component: ProviderSettingListComponent },
  { path: 'provider-settings/create', component: ProviderSettingFormComponent },
  {
    path: 'provider-settings/update/:skId',
    component: ProviderSettingFormComponent,
  },
  { path: '', redirectTo: '/provider-settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
