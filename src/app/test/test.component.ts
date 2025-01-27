import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-test',
  imports: [ButtonModule, Card],
  templateUrl: './test.component.html',
  styleUrl: './test.component.sass',
})
export class TestComponent {}
