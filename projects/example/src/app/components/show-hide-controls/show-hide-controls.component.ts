import { Component, OnInit } from '@angular/core';
import { FormComponentConfig, ShowHideFormTransformation } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-show-hide-controls',
  templateUrl: './show-hide-controls.component.html',
  styleUrls: ['./show-hide-controls.component.css']
})
export class ShowHideControlsComponent implements OnInit {
  formConfig: FormComponentConfig<any>;

  constructor() {
    this.formConfig = {
      descriptor: {
        id: '',
        name: '',
        fields: [
          {
            name: 'protocol',
            label: 'Protocol',
            type: 'select',
            data: [
              'HTTP', 'TCP',
            ],
          },
          {
            name: 'port',
            label: 'Port',
            type: 'number',
          },
          {
            name: 'path',
            label: 'Path',
            type: 'string',
          }
        ]
      },
      transformations: [
        new ShowHideFormTransformation('protocol', 'HTTP', ['path']),
      ],
    };
  }

  ngOnInit() {
  }

}
