import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormArrayName,
} from '@angular/forms';
import { ProvidersettingService } from '../../../services/providersetting.service';
import { ActivatedRoute, Router } from '@angular/router';

// Define interfaces for attributes and headers
interface Attribute {
  paramKey: string;
  datatype: string;
  AttributevalueType: string;
  attributestaticValue?: string; // Optional if not always required
  dynamicstaticValue?: string; // Optional if not always required
  boolstaticValue?: string;
}

interface Header {
  headerKey: string;
  valueType: string;
  staticValue?: string; // Optional if not always required
  dynamicValue?: string; // Optional if not always required
}

@Component({
  selector: 'app-providersettings-update',
  templateUrl: './providersettings-update.component.html',
  styleUrl: './providersettings-update.component.css',
})
export class ProvidersettingsUpdateComponent {
  updateprovider: FormGroup;
  skId: string = '';

  // connectionForm: FormGroup;
  // inputType: string = 'integer'; // Default selected input type

  providers = [
    { key: 1, name: 'Actel' },
    { key: 14, name: 'Actel-Advertising' },
    { key: 35, name: 'ComViva' },
    { key: 5, name: 'MobiSoft' },
  ];

  clients = [
    { key: 1, name: 'Mobile Arts' },
    { key: 3, name: 'Actel' },
    { key: 25, name: 'Actel-Mobile Arts' },
  ];
  services = [
    { key: 1, name: 'Amazing Videos' },
    { key: 2, name: 'Secret Box' },
    { key: 8, name: 'Games Box' },
  ];

  Countries = [
    { key: 1, name: 'LB' },
    { key: 2, name: 'SA' },
    { key: 3, name: 'AE' },
  ];

  Operators = [
    { key: 7, name: 'MTC' },
    { key: 1, name: 'Etisalat' },
    { key: 8, name: 'STC' },
  ];
  Status = [
    { key: 1, name: 'Online' },
    { key: 0, name: 'Offline' },
  ];

  //clients = ['Client A', 'Client B', 'Client C']; // Replace with your dropdown data
  //services = ['Service 1', 'Service 2', 'Service 3']; // Replace with your dropdown data
  // countries = ['Country 1', 'Country 2', 'Country 3']; // Replace with your dropdown data
  operators = ['Operator 1', 'Operator 2', 'Operator 3']; // Replace with your dropdown data
  RequestTypes = ['JSON', 'XML', 'Form Data'];
  ResponseTypes = ['JSON', 'XML', 'Form Data'];
  paramTyps = ['String', 'Int'];
  datatypes = ['Int', 'String'];
  Hedaerdynamicvalues = [
    'MSISDN',
    'PLMN',
    'OS',
    'Language',
    'UniqueID',
    'UserAgent',
    'UserIP',
    'Country',
  ];
  Attributedynamicvalues = [
    'MSISDN',
    'PLMN',
    'OS',
    'Language',
    'UniqueID',
    'UserAgent',
    'UserIP',
    'Country',
  ];

  constructor(
    private fb: FormBuilder,
    private providerService: ProvidersettingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateprovider = this.fb.group({
      PK: [''],
      SK: [''],
      ID: [''],
      IDProvider: [''],
      //DataType:[],
      // client: [''],
      IDService: [''], // Ensure these controls match what you use in the HTML
      IDClient: [''],
      IDCountry: [''],
      country: [''],
      IDOperator: [''],
      RequestType: [''],
      ResponseType: [''],
      Action: [''],
      Status: [''],
      Attributedynamicvalue: [],
      BasicURL: ['', Validators.required], // First textbox
      headers: this.fb.array([]),
      attributes: this.fb.array([]),
      inputValue: [''], // Dynamic input field value
      DataType: [''],

      //attributes: this.fb.array([this.createAttribute()]),
    });
  }
  ngOnInit(): void {
    //this.addHeader();       // Add one initial header row
    //this.addAttribute();    // Add one initial attribute parameter row
    // Clear the textbox whenever the dropdown changes
    this.updateprovider.get('attributeValue')?.setValue('');

    this.route.queryParamMap.subscribe((params) => {
      const encodedSkId = params.get('skId');
      if (encodedSkId) {
        this.skId = decodeURIComponent(encodedSkId); // Decode the skId
        this.fetchDataBySkId(this.skId);
      } else {
        console.error('skId parameter is missing.');
      }
    });
  }

  // Dynamically update validators and input type based on selected datatype
  onDataTypeChange(index: number): void {
    const attribute = this.attributes.at(index);
    if (attribute.get('datatype')?.value === 'Bool') {
      // Reset non-Bool specific controls
      attribute.get('AttributevalueType')?.reset();
      attribute.get('attributestaticValue')?.reset();
      attribute.get('dynamicstaticValue')?.reset();
    } else {
      // Reset Bool-specific control
      attribute.get('boolValue')?.reset();
    }

    // Store selected data type to use in template
    //attribute.get('selectedType')?.setValue(attribute.get('datatype')?.value);
  }

  getDynamicValues = () => {
    return [
      { value: '$MSISDN', name: '$MSISDN' },
      { value: '$PLMN', name: '$PLMN' },
      { value: '$OS', name: '$OS' },
      { value: '$Language', name: '$Language' },
      { value: '$UniqueID', name: '$UniqueID' },
      { value: '$UserIP', name: '$UserIP' },
      { value: '$Country', name: '$Country' },
    ];
  };

  getAttributeDynamicValues = () => {
    return [
      { value: '$MSISDN', name: '$MSISDN' },
      { value: '$PLMN', name: '$PLMN' },
      { value: '$OS', name: '$OS' },
      { value: '$Language', name: '$Language' },
      { value: '$UniqueID', name: '$UniqueID' },
      { value: '$UserIP', name: '$UserIP' },
      { value: '$Country', name: '$Country' },
    ];
  };

  // Create a new FormGroup for a header
  createHeader(key: string, value: string): FormGroup {
    const dynamicValues = this.getDynamicValues();
    let isDynamic = false;
    dynamicValues.forEach((v) => {
      if (v.value === value) {
        isDynamic = true;
      }
    });
    const valueType = isDynamic ? 'dynamic' : 'static';
    return this.fb.group({
      headerKey: [key],
      headerType: [''],
      headerValue: [''],
      valueType: [valueType],
      staticValue: [!isDynamic ? value : ''],
      dynamicValue: [isDynamic ? value : 'Select Dynamic Value'],
      Key: [key],
    });
  }

  // Create a new attribute form group
  // "Name": "Parameter1",
  //       "Type": "Number",
  //       "Value": "7677"
  createAttribute(Name: string, Type: string, value: string): FormGroup {
    const dynamicValues = this.getAttributeDynamicValues();
    let isattributeDynamic = false;
    dynamicValues.forEach((v) => {
      if (v.value === value) {
        isattributeDynamic = true;
      }
    });
    const valueType = isattributeDynamic
      ? 'attributedynamic'
      : 'attributestatic';
    return this.fb.group({
      paramKey: [Name],
      datatype: [Type], // Add datatype with required validation
      AttributevalueType: [valueType],
      attributedynamic: [''],
      dynamicstaticValue: [isattributeDynamic ? value : 'Select Dynamic Value'], // Set the default value here, e.g., 'option2'
      attributestaticValue: [!isattributeDynamic ? value : ''],
      inputValue: [''], // Input field or radio value
      boolstaticValue: [],
    });
  }

  // Get attributes as a FormArray
  get attributes(): FormArray {
    return this.updateprovider.get('attributes') as FormArray;
  }

  // Add new attribute

  addAttribute(Name: string, Type: string, Value: string) {
    this.attributes.push(this.createAttribute(Name, Type, Value)); // Ensure attributes is not null
  }

  // Method to add a new header
  addHeader(key: string, value: string) {
    this.headers.push(this.createHeader(key, value));
  }

  onlyAllowNumber(event: KeyboardEvent): void {
    const charCode = event.charCode || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Prevent non-numeric input
    }
  }

  onlyAllowText(event: KeyboardEvent): void {
    const charCode = event.charCode || event.keyCode;
    // Allow only alphabetic characters (A-Z, a-z) and space (32)
    if (
      (charCode < 65 || charCode > 90) && // Uppercase A-Z
      (charCode < 97 || charCode > 122) && // Lowercase a-z
      charCode !== 32 // Space
    ) {
      event.preventDefault(); // Prevent non-text input
    }
  }

  // Remove attribute
  removeAttribute(index: number) {
    if (this.attributes.length > 1) {
      this.attributes.removeAt(index);
    }
  }

  removeHeader(index: number) {
    if (this.headers.length > 1) {
      this.headers.removeAt(index);
    }
  }

  // Check if Bool is selected
  isBoolType(index: number): boolean {
    return this.attributes.at(index).get('datatype')?.value === 'Bool';
  }

  showStaticInput(index: number): boolean {
    const dataType = this.attributes.at(index).get('datatype')?.value;
    return dataType === 'Number' || dataType === 'String';
  }

  showBoolRadio(index: number): boolean {
    return this.attributes.at(index).get('datatype')?.value === 'Bool';
  }

  // Getters for easier access to form arrays
  get headers(): FormArray {
    return this.updateprovider.get('headers') as FormArray;
  }

  onSubmit() {
    if (this.updateprovider.valid) {
      const formData = this.updateprovider.value;

      // Get the current date and time for RegDate and UpdateDate
      const currentDateTime = new Date().toISOString();
      // Create JSON structure from form data
      const jsonData = {
        PK: formData.PK,
        SK: formData.SK,
        Status: formData.Status, // Boolean to "1" or "0"
        ID: formData.ID, // Null for new record
        IDService: parseInt(formData.IDService),
        IDClient: parseInt(formData.IDClient),
        IDCountry: parseInt(formData.IDCountry),
        IDOperator: parseInt(formData.IDOperator),
        IDProvider: parseInt(formData.IDProvider), // Assuming this comes from your form

        RegDate: formData.RegDate, // To be set later in API/backend if needed
        UpdateDate: null, // Same for UpdateDate
        RequestSettings: {
          BasicURL: formData.BasicURL,
          DataType: formData.RequestType,
          Action: formData.Action,

          // Loop over attributes to assign values properly, including dropdowns
          Parameters: formData.attributes.map((attribute: any) => {
            let value;

            // Handle different types of values (static, dynamic, dropdown)
            if (attribute.AttributevalueType === 'attributestatic') {
              value = attribute.attributestaticValue.toString();
            } else if (attribute.AttributevalueType === 'boolstaticValue') {
              value = attribute.selectedDropdownValue; // Assuming dropdown value comes from the form
            } else {
              value = attribute.boolstaticValue;
            }

            return {
              Name: attribute.paramKey,
              Type: attribute.datatype,
              Value: attribute.valueType,
            };
          }),

          // Headers mapping
          Headers: formData.headers.map((header: any) => ({
            Key: header.headerKey,
            Value:
              header.valueType === 'static'
                ? header.staticValue
                : header.dynamicValue,
          })),
        },

        // Response settings
        ResponseSettings: {
          DataType: formData.ResponseType,
        },
      };

      // Call the service to submit the data
      this.providerService.submitData(jsonData).subscribe(
        (response) => {
          console.log('Data Updated successfully:', response);
          // Optionally refresh the form or page here
        },
        (error) => {
          console.error('Error submitting data:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.updateprovider.errors);
    }
  }

  // Helper function to find invalid controls
  findInvalidControls() {
    const invalidControls = Object.keys(this.updateprovider.controls).filter(
      (key) => this.updateprovider.get(key)?.invalid
    );

    console.log('Invalid Controls:', invalidControls);

    invalidControls.forEach((control) => {
      const controlErrors = this.updateprovider.get(control)?.errors;
      console.log(`Errors in ${control}:`, controlErrors);
    });
  }

  private getHeaders(): FormArray {
    return this.updateprovider.get('headers') as FormArray;
  }

  showHideValueControl(index: number, type: string): boolean {
    const valueTypeControl = this.getHeaders()?.at(index).get('valueType');
    return valueTypeControl?.value ? valueTypeControl.value === type : false;
  }

  private getAttributes(): FormArray {
    return this.updateprovider.get('attributes') as FormArray;
  }

  showHideAttributeValueControl(index: number, type: string): boolean {
    const valueTypeControl = this.getAttributes()
      ?.at(index)
      .get('AttributevalueType');
    return valueTypeControl?.value ? valueTypeControl.value === type : false;
  }

  fetchDataBySkId(skId: string): void {
    console.log('Fetching data with skId:', skId); // Debugging log
    this.providerService.getDataBySkId(encodeURIComponent(skId)).subscribe(
      (data) => {
        // Set form values with fetched data  IDProvider
        this.updateprovider.get('IDClient')?.setValue(data[0].IDClient);
        this.updateprovider.get('IDProvider')?.setValue(data[0].IDProvider);
        this.updateprovider.get('IDService')?.setValue(data[0].IDService);
        this.updateprovider.get('IDCountry')?.setValue(data[0].IDCountry);
        this.updateprovider.get('IDOperator')?.setValue(data[0].IDOperator);
        this.updateprovider.get('Status')?.setValue(data[0].Status);
        this.updateprovider.get('ID')?.setValue(data[0].ID);
        this.updateprovider.get('PK')?.setValue(data[0].PK);
        this.updateprovider.get('SK')?.setValue(data[0].SK);
        this.updateprovider.get('RegDate')?.setValue(data[0].RegDate);
        //IDService
        //DataType
        // Binding each property individually
        this.updateprovider
          .get('BasicURL')
          ?.setValue(data[0].RequestSettings.BasicURL);

        this.updateprovider
          .get('DataType')
          ?.setValue(data[0].RequestSettings.DataType);
        this.updateprovider
          .get('Action')
          ?.setValue(data[0].RequestSettings.Action);
        this.updateprovider
          .get('ResponseType')
          ?.setValue(data[0].ResponseSettings.ResponseType);
        //InsertStatus

        for (const header of data[0].RequestSettings.Headers) {
          this.addHeader(header.Key, header.Value);
        }

        for (const attribute of data[0].RequestSettings.Parameters) {
          this.addAttribute(attribute.Name, attribute.Type, attribute.Value);
        }

        this.updateprovider.get('IDClient')?.setValue(data[0].IDClient);
        // Example for a textbox

        console.log('Form updated with data:', this.updateprovider.value);
        console.log('Form updated with data:', data); // Log updated form values
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
