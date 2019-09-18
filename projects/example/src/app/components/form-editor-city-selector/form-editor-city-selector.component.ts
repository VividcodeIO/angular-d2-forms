import { Component, OnInit } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';
import { CountryDataService } from '../../services/country-data/country-data.service';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-editor-city-selector',
  templateUrl: './form-editor-city-selector.component.html',
  styleUrls: ['./form-editor-city-selector.component.css']
})
export class FormEditorCitySelectorComponent extends FormFieldEditorComponent<string> implements OnInit {
  _cities: Observable<string[]>;

  constructor(private _countryDataService: CountryDataService) {
    super();
  }

  ngOnInit() {
    this._cities = combineLatest([
      this.dependencyValues['country'],
      this.dependencyValues['state'],
    ]).pipe(
      tap(() => this.notifyValueChanged(null)),
      switchMap(([country, state]) => this._countryDataService.citiesByCountryAndState(country, state)),
    );
  }

}
