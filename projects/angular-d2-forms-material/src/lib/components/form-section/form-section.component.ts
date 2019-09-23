import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { SECTION_FIELDS, SECTION_NAME, SECTION_TEMPLATE } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'ad2formsmaterial-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements OnInit {

  constructor(@Inject(SECTION_NAME) public section: string,
              @Inject(SECTION_FIELDS) public fields: any,
              @Inject(SECTION_TEMPLATE) public template: TemplateRef<any>) {
  }

  ngOnInit() {

  }

}
