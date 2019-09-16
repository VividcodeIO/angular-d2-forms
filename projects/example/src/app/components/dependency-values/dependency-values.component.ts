import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-dependency-values',
  templateUrl: './dependency-values.component.html',
  styleUrls: ['./dependency-values.component.css']
})
export class DependencyValuesComponent implements OnInit {
  formConfig: FormComponentConfig<any>;

  constructor() {
    this.formConfig = {
      descriptor: {
        id: '',
        name: '',
        fields: [
          {
            name: 'country',
            label: 'Country',
            type: 'select',
            data: [
              'China', 'US', 'New Zealand'
            ],
          },
          {
            name: 'state',
            label: 'State/Province',
            type: 'country-state',
            dependencies: ['country'],
          },
          {
            name: 'city',
            label: 'City',
            type: 'country-city',
            dependencies: ['country', 'state'],
          },
        ],
      },
    };
  }

  ngOnInit() {
  }

}
