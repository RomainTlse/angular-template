import { Component, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-forgot-pwd',
  imports: [Button, Card, FloatLabel, InputText],
  templateUrl: './forgot-pwd.component.html',
  styleUrl: './forgot-pwd.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPwdComponent {}
