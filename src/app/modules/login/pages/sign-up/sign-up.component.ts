import { Component, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-sign-up',
  imports: [Button, Card, FloatLabel, InputText, Password],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {}
