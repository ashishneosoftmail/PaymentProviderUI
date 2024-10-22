import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CopyProviderSettingService {
  private copiedData: any = null;

  setCopiedData(data: any) {
    this.copiedData = data;
  }

  getCopiedData() {
    return this.copiedData;
  }

  clearCopiedData() {
    this.copiedData = null;
  }

  constructor() {}
}
