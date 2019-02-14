import { Injectable } from '@angular/core';
import { FormTransformation } from '../form';

@Injectable({
  providedIn: 'root'
})
export class FormTransformationService {
  private _transformations: Map<string, FormTransformation<any>[]> = new Map();

  set(formId: string, transformations: FormTransformation<any>[]) {
    this._transformations.set(formId, transformations);
  }

  get(formId: string): FormTransformation<any>[] {
    return this._transformations.get(formId);
  }

  constructor() {
  }
}
