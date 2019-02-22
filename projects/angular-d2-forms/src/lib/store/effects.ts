import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FormTransformationService } from '../services/form-transformation.service';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { FormActionTypes, InitAction, UpdateStateAction } from './action';
import { map, withLatestFrom } from 'rxjs/operators';
import { selectDescriptor } from './state';
import { FormState } from '../form';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

@Injectable()
export class FormEffects {
  constructor(private action$: Actions,
              private store: Store<any>,
              private formTransformationService: FormTransformationService) {
  }

  @Effect()
  $initConfig: Observable<Action> = this.action$.pipe(
    ofType(FormActionTypes.INIT),
    map((action: InitAction) => {
      const state = this.applyTransformations(action.payload);
      return new UpdateStateAction({
        ...state,
        descriptorChanged: true,
        valueChanged: false,
      });
    }),
  );

  @Effect()
  $updateConfig: Observable<Action> = this.action$.pipe(
    ofType(FormActionTypes.UPDATE_VALUE),
    withLatestFrom(this.store),
    map(([action, store]) => {
        const {formId, value} = (action as any).payload;
        const descriptor = selectDescriptor(formId)(store);
        const state = this.applyTransformations({
          descriptor,
          value,
        });
        return new UpdateStateAction({
          ...state,
          descriptorChanged: !isEqual(descriptor, state.descriptor),
          valueChanged: !isEqual(value, state.value),
        });
    })
  );

  private applyTransformations<T>(formState: FormState<T>): FormState<T> {
    const formId = formState.descriptor.id;
    const transformations = this.formTransformationService.get(formId) || [];
    let state = cloneDeep(formState);
    transformations.forEach((transformation) => {
      state = transformation.transform(state);
    });
    return state;
  }
}
