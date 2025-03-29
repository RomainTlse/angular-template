import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { Password } from 'primeng/password';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../utils/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-new-pwd',
  imports: [
    Button,
    Card,
    FloatLabel,
    Password,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './new-pwd.component.html',
  styleUrl: './new-pwd.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class NewPwdComponent {
  errorMessage?: string;
  private _fb = inject(FormBuilder);
  newPwdForm = this._fb.group(
    {
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
    },
    {
      validator: this.passwordMatchValidator,
    }
  );
  private _route = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  newPassword() {
    if (this.newPwdForm.valid) {
      const { password } = this.newPwdForm.value;
      if (password) {
        const token = this._route.snapshot.queryParamMap.get('token') ?? '';
        console.log(token);
        this._authService.newPassword(password, token).subscribe({
          next: () => {
            this._router.navigate(['/login']);
          },
          error: (err) => {
            this.errorMessage = err.error;
          },
        });
      }
    }
  }
}
