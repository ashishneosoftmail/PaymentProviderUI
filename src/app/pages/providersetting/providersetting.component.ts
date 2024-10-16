

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormArrayName } from '@angular/forms';
import { ProvidersettingService } from '../../../services/providersetting.service';


// Define interfaces for attributes and headers
interface Attribute {
  paramKey: string;
  datatype: string;
  AttributevalueType: string;
  attributestaticValue?: string; // Optional if not always required
  dynamicstaticValue?: string;   // Optional if not always required
  boolstaticValue?:string;
}

interface Header {
  headerKey: string;
  valueType: string;
  staticValue?: string;           // Optional if not always required
  dynamicValue?: string;          // Optional if not always required
}

@Component({
  selector: 'app-providersetting',
  templateUrl: './providersetting.component.html',
  styleUrl: './providersetting.component.css'
})
export class ProvidersettingComponent implements OnInit {

  
  connectionForm: FormGroup;
  inputType: string = 'integer'; // Default selected input type


  providers = [
    { key: 1, name: 'Actel' },
    { key: 14, name: 'Actel-Advertising' },
    { key: 35, name: 'ComViva' },
    { key: 5, name: 'MobiSoft' }
  ];

  clients = [
    { key: 1, name: 'Mobile Arts' },
    { key: 3, name: 'Actel' },
    { key: 25, name: 'Actel-Mobile Arts' }
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
  Status=[
    { key: 1, name: 'Online' },
    { key: 0, name: 'Offline' }
  ]

  //clients = ['Client A', 'Client B', 'Client C']; // Replace with your dropdown data
  //services = ['Service 1', 'Service 2', 'Service 3']; // Replace with your dropdown data
  // countries = ['Country 1', 'Country 2', 'Country 3']; // Replace with your dropdown data
  operators = ['Operator 1', 'Operator 2', 'Operator 3']; // Replace with your dropdown data
  RequestTypes = ['JSON', 'XML', 'Form Data'];
  ResponseTypes = ['JSON', 'XML', 'Form Data'];
  paramTyps = ['String', 'Int'];
  datatypes = ['Int', 'String'];
  Hedaerdynamicvalues = ['MSISDN', 'PLMN', 'OS', 'Language', 'UniqueID', 'UserAgent', 'UserIP', 'Country'];
  Attributedynamicvalues = ['MSISDN', 'PLMN', 'OS', 'Language', 'UniqueID', 'UserAgent', 'UserIP', 'Country'];

  constructor(private fb: FormBuilder, private providerService: ProvidersettingService) {
    this.connectionForm = this.fb.group({
      id:0,
      provider: [1, Validators.required],
      client: [1, Validators.required],
      service: [1, Validators.required],
      country: [1, Validators.required],
      operator: [7, Validators.required],
      RequestType: ['JSON', Validators.required],
      ResponseType: ['JSON', Validators.required],
      action: ['GET', Validators.required],
      Status:[1,Validators.required],
      Attributedynamicvalue: [],
      BasicURL: ['', Validators.required],  // First textbox
      dataType:['Number'],
      headers: this.fb.array([]),
      attributes: this.fb.array([]),
      inputValue: [''], // Dynamic input field value
      InsertStatus:['1',Validators.required]

      //attributes: this.fb.array([this.createAttribute()]),

    });
  }

  ngOnInit(): void {
    this.addHeader();       // Add one initial header row
    this.addAttribute();    // Add one initial attribute parameter row
   
      // Clear the textbox whenever the dropdown changes
   this.connectionForm.get('attributeValue')?.setValue('');

  }


    // Dynamically update validators and input type based on selected datatype
    onDataTypeChange(index: number): void {
      const attribute = this.attributes.at(index);
    debugger;
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
      attribute.get('selectedType')?.setValue(attribute.get('datatype')?.value);
    }
    


    

  // Function to generate GUID
  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  // Create a new FormGroup for a header
  createHeader(): FormGroup {
    return this.fb.group({
      headerKey: [''],
      headerType: [''],
      headerValue: [''],
      valueType: ['static'],
      staticValue: [''],
      dynamicValue: ['Select Dynamic Value'],
      
    });
  }

  // Create a new attribute form group
  createAttribute(): FormGroup {
    return this.fb.group({
      paramKey: ['', Validators.required],
      datatype: ['Number', Validators.required], // Add datatype with required validation
      paramValue: [''],
      AttributevalueType: ['attributestatic', Validators.required],
      attributedynamic: ['option2'],
      dynamicstaticValue: ['Select Dynamic Value'], // Set the default value here, e.g., 'option2'
      attributestaticValue: [''],
      inputValue: [''], // Input field or radio value
      boolstaticValue:[],
      
      



    });
    
  }


  // Get attributes as a FormArray
  get attributes(): FormArray {
    return this.connectionForm.get('attributes') as FormArray;
  }

  // Add new attribute
 
  addAttribute() {
    const attributeForm = this.fb.group({
      datatype: ['Number'],
      AttributevalueType: ['attributestatic'],
      attributestaticValue: [''],
      dynamicstaticValue: ['Select Dynamic Value'],
      boolValue: [null],
      selectedType: ['Number'], // To store the selected data type
      paramKey:[''],
      boolstaticValue:[],
    });
  // Add new attribute
  this.attributes.push(attributeForm); // Ensure attributes is not null

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

  // Method to add a new header
  addHeader(): void {

    this.headers.push(this.createHeader());
  }


  // Method to remove a header
  // removeHeader(index: number): void {
  //  this.headers.removeAt(index);
  //}
  removeHeader(index: number) {
    if (this.headers.length > 1) {
      this.headers.removeAt(index);
    }
  }



  // Getters for easier access to form arrays
  get headers(): FormArray {
    return this.connectionForm.get('headers') as FormArray;
  }



  onSubmit() {
    if (this.connectionForm.valid) {
      const formData = this.connectionForm.value;
  
      // Get the current date and time for RegDate and UpdateDate
      const currentDateTime = new Date().toISOString();
      debugger;
  
      // Create JSON structure from form data
      const jsonData = {
        Status: formData.Status, // Boolean to "1" or "0"
        ID: null, // Null for new record
        IDService: formData.service,
        IDClient: formData.client,
        IDCountry: formData.country,
        IDOperator: formData.operator,
        IDProvider: formData.provider, // Assuming this comes from your form
        RegDate: null, // To be set later in API/backend if needed
        UpdateDate: null, // Same for UpdateDate
        RequestSettings: {
          BasicURL: formData.BasicURL, 
          DataType: formData.RequestType,
          Action: formData.action, 
  
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
              Value: value,
            };
          }),
  
          // Headers mapping
          Headers: formData.headers.map((header: any) => ({
            Key: header.headerKey,
            Value: header.valueType === 'static' ? header.staticValue : header.dynamicValue,
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
          console.log('Data submitted successfully:', response);
          // Optionally refresh the form or page here
        },
        (error) => {
          console.error('Error submitting data:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.connectionForm.errors);
    }
  }
  

  // Helper function to find invalid controls
findInvalidControls() {
  const invalidControls = Object.keys(this.connectionForm.controls).filter((key) => 
    this.connectionForm.get(key)?.invalid
  );



  console.log('Invalid Controls:', invalidControls);

  invalidControls.forEach((control) => {
    const controlErrors = this.connectionForm.get(control)?.errors;
    console.log(`Errors in ${control}:`, controlErrors);
  });
}


  private getHeaders(): FormArray {
    return this.connectionForm.get('headers') as FormArray;
  }


  showHideValueControl(index: number, type: string): boolean {
    const valueTypeControl = this.getHeaders()?.at(index).get('valueType');
    return valueTypeControl?.value ? valueTypeControl.value === type : false;
  }

  private getAttributes(): FormArray {
    return this.connectionForm.get('attributes') as FormArray;
  }

  showHideAttributeValueControl(index: number, type: string): boolean {
    const valueTypeControl = this.getAttributes()?.at(index).get('AttributevalueType');
    return valueTypeControl?.value ? valueTypeControl.value === type : false;
  }


}