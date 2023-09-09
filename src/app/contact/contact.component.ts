import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { NotifierService } from 'angular-notifier';
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

  private notifier: NotifierService;

	/**
	 * Constructor
	 *
	 * @param {NotifierService} notifier Notifier service
	 */
	public constructor( notifier: NotifierService ) {
		this.notifier = notifier;
	}

	/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
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
    if(data.from_name != '' && data.from_email != '' && data.message != '' && data.subject != ''){
      emailjs.send('service_a18ko9m', 'template_jwhigqe', data,'2ithvLZdAFQsBsBrt')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent:', response);
        this.showNotification( 'success', 'Email successfully sent!' );
        this.formdata.reset();
        // Handle success, e.g., show a success message to the user
      }, (error) => {
        console.error('Email sending failed:', error);
        this.formdata.reset();
        this.showNotification( 'error', 'Whoops, something went wrong. Probably!' );
        // Handle error, e.g., show an error message to the user
      });
    }
    else{
      this.formdata.reset();
      this.showNotification( 'error', 'Whoops, Please fill all the details!' );
    }
  }
}
