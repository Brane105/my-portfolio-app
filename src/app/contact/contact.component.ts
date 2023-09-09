import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: any;
  email: any;
  subject: any;
  message: any;
  formdata: any;

  constructor() {}
  ngOnInit() {
    this.formdata = new FormGroup({
      from_name: new FormControl(""),
      from_email: new FormControl(""),
      subject: new FormControl(""),
      message: new FormControl("")
    });
 }
  sendEmail(data:any) {
    console.log(data)
    emailjs.send('service_a18ko9m', 'template_jwhigqe', data,'2ithvLZdAFQsBsBrt')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent:', response);
        // Handle success, e.g., show a success message to the user
      }, (error) => {
        console.error('Email sending failed:', error);
        // Handle error, e.g., show an error message to the user
      });
  }
}
