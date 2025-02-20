import { Component, ViewEncapsulation } from '@angular/core';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [Card, FloatLabel, InputText, Password, Checkbox, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {}
