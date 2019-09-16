import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private _data = {
    'US': {
      'Alabama': ['Montgomery', 'Birmingham'],
      'Alaska': ['Juneau', 'Anchorage'],
      'California': ['Sacramento', 'Los Angeles'],
    },
    'China': {
      'Beijing': ['Beijing'],
      'Shanghai': ['Shanghai'],
      'Hunan': ['Changsha', 'Zhuzhou', 'Xiangtan'],
      'Henan': ['Zhengzhou', 'Shangqiu', 'Luoyang'],
    },
    'New Zealand': {
      '<All>': ['Auckland', 'Christchurch', 'Wellington']
    },
  };

  constructor() {
  }

  statesByCountry(country: string): Observable<string[]> {
    return of(Object.keys(this._data[country] || {}));
  }

  citiesByCountryAndState(country: string, state: string): Observable<string[]> {
    return of(this._data[country][state] || []);
  }
}
