import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../utils/services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  imports: [
    Button,
    Card,
    FloatLabel,
    InputText,
    Password,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  private _fb = inject(FormBuilder);
  registerForm: FormGroup = this._fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    },
    {
      validator: this.passwordMatchValidator,
    }
  );

  private _authService = inject(AuthService);
  private _router = inject(Router);

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      const { email, username, password, firstname, lastname } =
        this.registerForm.value;
      if (email && password && username && firstname && lastname) {
        console.log('rrrrrRRRR');
        this._authService
          .register(email, password, username, firstname, lastname)
          .subscribe(() => {
            this._router.navigate(['/login']);
          });
      }
    }
  }
}
