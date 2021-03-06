/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_CONTROL_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   // tslint:disable-next-line:no-use-before-declare
   useExisting: forwardRef(() => StCheckboxComponent),
   multi: true
};

@Component({
   selector: 'st-checkbox',
   templateUrl: './st-checkbox.component.html',
   providers: [CHECKBOX_CONTROL_ACCESSOR],
   styleUrls: ['./st-checkbox.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StCheckboxComponent implements ControlValueAccessor {

   @Input() get checked(): boolean {
      return this._checked;
   }

   set checked(checked: boolean) {
      if (checked !== this.checked) {
         this._checked = checked;
         this._changeDetectorRef.markForCheck();
      }
   }

   @Input() name: string;
   @Input() qaTag: string;
   @Input() disabled: boolean;
   @Input() required: boolean;
   @Input() readonly: boolean;
   @Input() value: any;
   @Output() change: EventEmitter<any> = new EventEmitter<any>();

   private _value: string;
   private _values: any;
   private _checked: boolean = false;

   constructor(
      private _changeDetectorRef: ChangeDetectorRef
   ) {

   }

   _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

   onTouched: () => any = () => { };

   handleClick(): void {
      if (!this.readonly) {
         if (!this.disabled) {
            this._checked = !this._checked;
            this._controlValueAccessorChangeFn(this._checked);
            this.change.emit({ checked: this.checked, value: this.value });
         }
      }
   }

   handleChange($event: Event): void {
      $event.stopPropagation();
   }

   writeValue(value: any): void {
      this._checked = value;
   }

   registerOnChange(fn: (value: any) => void): void {
      this._controlValueAccessorChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
      this._changeDetectorRef.markForCheck();
   }

}
