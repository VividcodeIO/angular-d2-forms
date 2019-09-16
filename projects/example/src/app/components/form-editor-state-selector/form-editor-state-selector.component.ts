import { Component, OnInit } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';
import { CountryDataService } from '../../services/country-data/country-data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-editor-state-selector',
  templateUrl: './form-editor-state-selector.component.html',
  styleUrls: ['./form-editor-state-selector.component.css']
})
export class FormEditorStateSelectorComponent extends FormFieldEditorComponent<string> implements OnInit {
  _states: Observable<string[]>;

  constructor(private _countryDataService: CountryDataService) {
    super();
  }

  ngOnInit() {
    this._states = this.dependencyValues['country'].pipe(
      switchMap(country => this._countryDataService.statesByCountry(country)),
    );
  }

}
