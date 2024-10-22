import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersettingComponent } from './pages/providersetting/providersetting.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProvidersettingsListComponent } from './pages/providersettings-list/providersettings-list.component';
import { ProvidersettingsUpdateComponent } from './pages/providersettings-update/providersettings-update.component';
import { ProviderSettingListComponent } from './components/provider-setting-list/provider-setting-list.component';
import { ProviderSettingFormComponent } from './components/provider-setting-form/provider-setting-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersettingComponent,
    ProvidersettingsListComponent,
    ProvidersettingsUpdateComponent,
    ProviderSettingListComponent,
    ProviderSettingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, // Ensure this is imported
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
