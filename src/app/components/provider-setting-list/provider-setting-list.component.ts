import { Component, OnInit } from '@angular/core';
import { ProviderSetting } from '../../models/provider.model';
import { ProviderSettingService } from '../../services/provider-setting.service';
import { CopyProviderSettingService } from '../../services/copy-provider-setting.service';

import { Router } from '@angular/router';
import { providers } from '../../../constants';

@Component({
  selector: 'app-provider-setting-list',
  templateUrl: './provider-setting-list.component.html',
  styleUrl: './provider-setting-list.component.css',
})
export class ProviderSettingListComponent implements OnInit {
  providerSettings: ProviderSetting[] = [];
  selectedProvider: string = '';

  constructor(
    private providerSettingService: ProviderSettingService,
    private router: Router,
    private copyprovider: CopyProviderSettingService
  ) {}

  // Navigate to the form with selected row data --akash
  copyToCreateForm(selectedData: any) {
    this.router.navigate(['/provider-settings/create'], {
      state: { data: selectedData },
    });
  }

  ngOnInit(): void {
    this.loadProviderSettings();
  }

  get providers() {
    return providers;
  }

  loadProviderSettings() {
    if (!this.selectedProvider) return;

    const selectedProviderId = parseInt(this.selectedProvider);

    this.providerSettingService
      .getProviderSettingsByProviderId(selectedProviderId)
      .subscribe((data: ProviderSetting[]) => {
        this.providerSettings = data;
      });
  }

  deleteProviderSetting(skId: string | undefined) {
    if (!skId) return;

    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (confirmed) {
      const encodedSkId = encodeURIComponent(skId);

      this.providerSettingService.deleteProviderSetting(encodedSkId).subscribe(
        (skId: ProviderSetting) => {
          // Show notification that provider is deleted.
          console.log('Provider setting deleted:', skId);
          alert('Provider iteam deleted successfully!');

          // Load all providers again
          this.loadProviderSettings();
        },
        (error) => {
          console.error('Error deleting provider setting:', error);
          // Optionally show an error message to the user
        }
      );
    } else {
      // Redirect to a different page if the user clicks "Cancel"
      this.router.navigate(['/provider-settings']); // Change to your desired route
    }
  }

  navigateToCreate() {
    this.router.navigate(['/provider-settings/create']);
  }

  navigateToUpdate(skId: string | undefined) {
    if (!skId) return;

    const encodedSkId = encodeURIComponent(skId);
    this.router.navigate([`/provider-settings/update/${encodedSkId}`]);
  }

  // Method to handle copy event
}
