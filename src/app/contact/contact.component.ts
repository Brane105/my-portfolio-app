import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

interface ContactForm {
  name: FormControl<string>;
  email: FormControl<string>;
  subject: FormControl<string>;
  message: FormControl<string>;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('successPop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(10px)' }),
        animate('260ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ]
})
export class ContactComponent {
  submitted = false;
  sent = false;

  contactForm = new FormGroup<ContactForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    subject: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] })
  });

  contactLinks = [
    { icon: 'ti-mail', label: 'Email', value: 'branedev105@gmail.com', href: 'mailto:branedev105@gmail.com' },
    { icon: 'ti-map-pin', label: 'Location', value: 'Mumbai, India', href: 'https://www.google.com/maps/place/Mumbai' },
    { icon: 'ti-brand-linkedin', label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://www.linkedin.com/' },
    { icon: 'ti-brand-github', label: 'GitHub', value: 'View repositories', href: 'https://github.com/Brane105' }
  ];

  sendMessage(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sent = true;
    this.contactForm.reset();
    this.submitted = false;

    window.setTimeout(() => {
      this.sent = false;
    }, 3600);
  }

  hasError(controlName: keyof ContactForm): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted);
  }
}
