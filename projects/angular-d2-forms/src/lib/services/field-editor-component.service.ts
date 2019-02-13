import { Injectable } from '@angular/core';
import concat from 'lodash.concat';
import without from 'lodash.without';

@Injectable({
  providedIn: 'root'
})
export class FieldEditorComponentService {
  private _components: Map<String, any[]> = new Map();

  constructor() {
  }

  registerComponent(formId: string, component: any) {
    if (this._components.has(formId)) {
      this._components.set(formId, concat(this._components.get(formId), component));
    } else {
      this._components.set(formId, [component]);
    }
  }

  unregisterComponent(formId: string, component: any) {
    if (this._components.has(formId)) {
      this._components.set(formId, without(this._components.get(formId), component));
    }
  }

  save(formId: string) {
    if (this._components.has(formId)) {
      this._components.get(formId).forEach(component => component.save());
    }
  }
}
