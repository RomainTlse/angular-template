import { Component, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-new-pwd',
  imports: [Button, Card, FloatLabel, InputText, Password],
  templateUrl: './new-pwd.component.html',
  styleUrl: './new-pwd.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class NewPwdComponent {}
