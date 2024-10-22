import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProvidersettingService } from '../../../services/providersetting.service';
import { CopyProviderSettingService } from '../../services/copy-provider-setting.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providersettings-list',
  templateUrl: './providersettings-list.component.html',
  styleUrl: './providersettings-list.component.css',
})
export class ProvidersettingsListComponent {
  serviceForm: FormGroup;
  gridData: any[] = [];
  providers: any[] = [
    { id: 1, name: 'Actel' },
    { id: 14, name: 'Actel-Advertising' },
    { id: 35, name: 'ComViva' },
    { id: 5, name: 'MobiSoft' },
  ];

  providerobj: any = {
    IDClient: 0,
    IDService: 0,
    IDCountry: 0,
    IDOperator: 0,
    ID: '',
  };

  serviceData: any[] = []; // To hold the service data for the GridView

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private copyprovider: CopyProviderSettingService,
    private providersettingService: ProvidersettingService
  ) {
    this.serviceForm = this.fb.group({
      providerId: [''],
      IDService: [''],
      IDClient: [''],
      IDCountry: [''],
      ID: [''],
    });
  }

  ngOnInit(): void {}

  onProviderChange() {
    const providerId = this.serviceForm.get('providerId')?.value;
    if (providerId) {
      this.providersettingService.getProviderData(providerId).subscribe(
        (data) => {
          this.serviceData = data; // Update serviceData for the GridView
          console.log(data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
    // Get the data passed through the route
    // const data = this.router.navigate.data['updateData'];
    // this.serviceForm.patchValue(data);
  }

  // fetchGridData(skid: string): void {
  //   debugger;
  //   this.providersettingService.getDataBySkId(skid).subscribe((data) => {
  //     this.gridData = data;
  //     console.log(data);
  //   });
  // }

  onUpdate(skId: string): void {
    const encodedSkId = encodeURIComponent(skId);
    this.router.navigate(['/providerupdate'], {
      queryParams: { skId: encodedSkId },
    });
    console.log('Navigating to update with skId:', encodedSkId);

    // this.router.navigate([`/providerupdate/${skId}`]);
  }

  onDelete(serviceId: number) {
    console.log('Delete clicked for service ID:', serviceId);
    this.serviceData = this.serviceData.filter(
      (item) => item.IDService !== serviceId
    );
  }
  onCopy(data: any) {
    const textToCopy = `Service: ${data.IDService}, Client: ${data.IDClient},Operator: ${data.operator}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  OnAddProvider() {
    this.router.navigate(['/providersetting']);
  }

  //================================================new chnages================================

  // copyRowData(item: any) {
  //   this.copyprovider.setCopiedData(item);
  //   this.router.navigate(['/provider-settings/create']); // Navigate to Create form
  // }

  //================================================new chnages done============================
}
