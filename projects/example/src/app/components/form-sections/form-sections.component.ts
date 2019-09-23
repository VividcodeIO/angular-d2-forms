import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';
import { FormSectionComponent } from '@vividcode/angular-d2-forms-material';

@Component({
  selector: 'app-form-sections',
  templateUrl: './form-sections.component.html',
  styleUrls: ['./form-sections.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormSectionsComponent implements OnInit {
  formConfig: FormComponentConfig<any>;

  constructor() {
    this.formConfig = {
      descriptor: {
        fields: [
          {
            name: 'name1',
            label: 'Name 1',
            type: 'string',
          },
          {
            name: 'nameSection1',
            label: 'Name - section 1',
            type: 'string',
            section: 'section1',
          },
          {
            name: 'nameSection2',
            label: 'Name - section 2',
            type: 'string',
            section: 'section2',
          },
        ],
      },
      section: {
        component: FormSectionComponent,
        orders: ['section2', 'section1'],
      },
    };
  }

  ngOnInit() {
  }

}
