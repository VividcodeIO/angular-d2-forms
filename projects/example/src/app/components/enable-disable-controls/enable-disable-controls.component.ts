import { Component, OnInit } from '@angular/core';
import { FormComponentConfig, EnableDisableFormTransformation } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-enable-disable-controls',
  templateUrl: './enable-disable-controls.component.html',
  styleUrls: ['./enable-disable-controls.component.css']
})
export class EnableDisableControlsComponent implements OnInit {
  checkBoxForm: FormComponentConfig<any>;

  constructor() {
    this.checkBoxForm = {
      descriptor: {
        id: '',
        name: '',
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'isVip',
            label: 'VIP?',
            type: 'boolean',
          },
          {
            name: 'discount',
            label: 'Discount',
            type: 'number',
          }
        ],
      },
      transformations: [
        new EnableDisableFormTransformation('isVip', ['discount']),
      ],
    };
  }

  ngOnInit() {
  }

}
