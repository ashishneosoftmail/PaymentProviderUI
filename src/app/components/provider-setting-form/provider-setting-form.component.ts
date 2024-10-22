import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProviderSettingService } from '../../services/provider-setting.service';
import { CopyProviderSettingService } from '../../services/copy-provider-setting.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ProviderSetting } from '../../models/provider.model';
import {
  clients,
  countries,
  dynamicValues,
  operators,
  parameterDataTypes,
  providers,
  requestDataTypes,
  responseDataTypes,
  services,
  status,
} from '../../../constants';

@Component({
  selector: 'app-provider-setting-form',
  templateUrl: './provider-setting-form.component.html',
  styleUrl: './provider-setting-form.component.css',
})
export class ProviderSettingFormComponent {
  provSetForm: FormGroup;
  isEditMode: boolean = false;
  isDropdownDisabled = false; // Track disabled state
  skId: string | undefined;
  providerSetting: ProviderSetting | undefined;
  isBoolSelected = false;

  constructor(
    private providerSettingService: ProviderSettingService,
    private copyprovider: CopyProviderSettingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.provSetForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
    this.checkIfEditMode();
    //this.onDataTypeChange(); // Initialize with the default behavior
    // create one header for Create Provider Setting
    if (this.isEditMode === false) {
      this.addNewHeader('', 'static', '');
      this.addNewParameter('', '', 'static', '');
    }

    // Retrieve data passed via state
    const stateData = history.state.data;
    if (stateData) {
      this.copyToCreateForm(stateData);
    }
  }

  initForm() {
    //if (!this.providerSetting) return;

    this.provSetForm = this.fb.group({
      PK: [''],
      SK: [''],
      ID: [''],
      RegDate: [null],
      UpdateDate: [null],
      IDProvider: [1, [Validators.required]],
      IDClient: [1, [Validators.required]],
      IDService: [1, [Validators.required]],
      IDCountry: [1, [Validators.required]],
      IDOperator: [1, [Validators.required]],
      Status: [1, [Validators.required]],
      RequestSettings: this.fb.group({
        BasicURL: ['', Validators.required],
        DataType: ['JSON', Validators.required],
        Action: ['GET', Validators.required],
        Parameters: this.fb.array([]),
        Headers: this.fb.array([]),
      }),
      ResponseSettings: this.fb.group({
        DataType: ['JSON'],
      }),
    });
  }

  get responseSettings() {
    return this.provSetForm.get('ResponseSettings') as FormGroup;
  }
  get requestSettings() {
    return this.provSetForm.get('RequestSettings') as FormGroup;
  }

  get headers() {
    return this.requestSettings.get('Headers') as FormArray;
  }
  get basicurl() {
    return this.requestSettings.get('BasicURL') as FormArray;
  }

  get parameters() {
    return this.requestSettings.get('Parameters') as FormArray;
  }

  get clients() {
    return clients;
  }

  get operators() {
    return operators;
  }

  get parameterDataTypes() {
    return parameterDataTypes;
  }

  get dynamicValues() {
    return dynamicValues;
  }

  get providers() {
    return providers;
  }

  get services() {
    return services;
  }

  get countries() {
    return countries;
  }

  get statusList() {
    return status;
  }

  get requestTypes() {
    return requestDataTypes;
  }
  get responseTypes() {
    return responseDataTypes;
  }

  checkControlValid(controlName: string) {
    const control = this.provSetForm.controls[controlName];
    return (control.invalid || control.value === '') && control.touched;
  }

  addNewHeader(
    key: string = '',
    valueType: string = 'static',
    value: string = ''
  ) {
    if (!key) key = '';
    if (!valueType) valueType = 'static';
    if (!value) value = '';

    const headerGroup = this.fb.group({
      Key: [key, Validators.required],
      ValueType: [valueType, Validators.required],
      Value: [value, Validators.required],
    });

    this.headers.push(headerGroup);
  }

  removeHeader(index: number) {
    this.headers.removeAt(index);
  }

  addNewParameter(
    name: string = '',
    type: string = 'number',
    valueType: string = 'static',
    value: string = ''
  ) {
    if (!name) name = '';
    if (!type) type = 'number';
    if (!valueType) valueType = 'static';
    if (!value) value = '';

    const parameterGroup = this.fb.group({
      Name: [name, Validators.required],
      Type: [type, Validators.required],
      ValueType: [valueType, Validators.required],
      Value: [value, Validators.required],
    });

    this.parameters.push(parameterGroup);
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }

  checkIfEditMode() {
    this.route.paramMap.subscribe((params) => {
      const skIdParam = params.get('skId');
      if (skIdParam) {
        this.isEditMode = true;
        this.skId = skIdParam;
        this.loadProviderSetting(this.skId);
      }
    });
  }

  loadProviderSetting(skId: string): void {
    this.providerSettingService
      .getProviderSetting(skId)
      .subscribe((p: ProviderSetting[]) => {
        let providerSetting: ProviderSetting | undefined;

        if (p.length === 0) {
          return;
        }

        providerSetting = p[0];

        this.providerSetting = providerSetting;
        this.isDropdownDisabled = true; // Disable dropdown on update akash
        this.provSetForm.get('IDProvider')?.disable();
        this.provSetForm.get('IDService')?.disable();
        this.provSetForm.get('IDClient')?.disable();
        this.provSetForm.get('IDCountry')?.disable();
        this.provSetForm.get('IDOperator')?.disable();
        this.provSetForm.get('Status')?.disable();
        this.provSetForm.patchValue(this.providerSetting);

        const headers = providerSetting.RequestSettings.Headers;
        if (headers) {
          headers.forEach((header) => {
            const isDynamicValue = dynamicValues.includes(header.Value);

            const valueType = isDynamicValue ? 'dynamic' : 'static';

            this.addNewHeader(header.Key, valueType, header.Value);
          });
        }
        const parameters = providerSetting.RequestSettings.Parameters;
        if (parameters) {
          parameters.forEach((parameter) => {
            const isDynamicValue = dynamicValues.includes(parameter.Value);

            const valueType = isDynamicValue ? 'dynamic' : 'static';

            this.addNewParameter(
              parameter.Name,
              parameter.Type,
              valueType,
              parameter.Value
            );
          });
        }
      });
  }

  onCancel() {
    this.router.navigate(['/provider-settings']);
  }

  onSubmit() {
    if (!this.provSetForm.valid) return;

    this.providerSetting = this.provSetForm.getRawValue();
    // const formvalue = this.provSetForm.getRawValue();

    //console.log(this.provSetForm.value);

    if (!this.providerSetting) return;

    if (this.isEditMode && this.skId) {
      this.providerSettingService
        .updateProviderSetting(this.skId, this.providerSetting)
        .subscribe(() => {
          alert('Provider Upadted Successfully');
          this.router.navigate(['/provider-settings']);
        });
    } else {
      // create new provider setting
      this.providerSettingService
        .createProviderSetting(this.providerSetting)
        .subscribe(() => {
          alert('Provider Created Successfully');
          this.router.navigate(['/provider-settings']);
        });
    }
  }

  //akash changes

  copyToCreateForm(data: any) {
    this.provSetForm.patchValue({
      IDProvider: data.IDProvider,
      IDClient: data.IDClient,
      IDService: data.IDService,
      IDCountry: data.IDCountry,
      IDOperator: data.IDOperator,
      Status: data.Status,
      RequestSettings: {
        BasicURL: data.RequestSettings.BasicURL,
        DataType: data.RequestSettings.DataType,
        Action: data.RequestSettings.Action,

        // Parameters: this.fb.array([]),
        // Headers: this.fb.array([]),
      },
      ResponseSettings: {
        DataType: data.ResponseSettings.DataType,
      },
    });

    // Clear and repopulate headers and parameters
    // Clear existing headers and parameters
    this.headers.clear();
    this.parameters.clear();
    console.log('all data', this.provSetForm.value);
    console.log('check the data->', data);

    // Populate headers and parameters with the new data
    data.RequestSettings.Headers.forEach((header: any) => {
      console.log('Adding Header:', header); // Debugging

      const isDynamicValue = dynamicValues.includes(header.Value);

      const valueType = isDynamicValue ? 'dynamic' : 'static';

      this.addNewHeader(header.Key, valueType, header.Value);
    });

    console.log();

    data.RequestSettings.Parameters.forEach((Parameters: any) => {
      console.log('Adding Parameter:', Parameters); // Debugging
      const isDynamicValue = dynamicValues.includes(Parameters.Value);

      const valueType = isDynamicValue ? 'dynamic' : 'static';
      this.addNewParameter(
        Parameters.Name,
        Parameters.Type,
        valueType,
        Parameters.Value
      );
    });
  }
}
