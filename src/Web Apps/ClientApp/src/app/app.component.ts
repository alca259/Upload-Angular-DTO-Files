import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';

  applyForm = new FormGroup({
    prop1: new FormControl(''),
    prop2: new FormControl('')
  });

  myFile: File | undefined; // Variable to store file

  constructor(private httpClient: HttpClient) {}

  submitChanges() : void {

    // Crear un nuevo FormData
    const formData = new FormData();

    // Agregar las propiedades JSON al FormData
    formData.append('prop1', this.applyForm.value.prop1 ?? "");
    formData.append('prop2', this.applyForm.value.prop2 ?? "");

    // Agregar el archivo al FormData directamente
    formData.append('myFile', this.myFile!, this.myFile?.name);

    // Realizar la llamada POST
    const url = "http://localhost:5000/test/save-and-upload";
    
    this.httpClient.post(url, formData)
    .subscribe(response => {
        console.log(response);
        alert('Uploaded Successfully.');
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
    }
  }
}
