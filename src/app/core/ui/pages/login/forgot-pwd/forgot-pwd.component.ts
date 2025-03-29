import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../utils/services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-pwd',
  imports: [
    Button,
    Card,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPwdComponent {
  errorMessage?: string;
  private _fb = inject(FormBuilder);
  forgotPwdForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  private _authService = inject(AuthService);
  private _router = inject(Router);

  forgotPassword() {
    if (this.forgotPwdForm.valid) {
      const { email } = this.forgotPwdForm.value;
      if (email) {
        this._authService.forgotPassword(email).subscribe({
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
