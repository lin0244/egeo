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
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SelectOneDispatcher } from '../utils/unique-dispatcher';
import { StRadioComponent, StRadioGroupComponent } from './st-radio.component';

describe('StRadioGroup', () => {

   @Component({
      template: `
            <st-radio-group [(ngModel)]="modelValue" (change)="lastEvent = $event">
                  <st-radio *ngFor="let item of items" [value]="item.value">
                  {{item.label}}
                  </st-radio>
            </st-radio-group>
      `
   })
   class RadioGroupWithModel {
      modelValue: string;
      items: any[] = [
         { label: 'example1', value: '1' },
         { label: 'example2', value: '2' },
         { label: 'example3', value: '3' }
      ];
   }

   let fixture: ComponentFixture<RadioGroupWithModel>;
   let compiled: any;
   let groupDebugElement: DebugElement;
   let groupNativeElement: HTMLElement;
   let radioDebugElements: DebugElement[];
   let radioNativeElements: HTMLElement[];
   let radioLabelElements: HTMLLabelElement[];
   let radioInputElements: HTMLInputElement[];
   let groupInstance: StRadioGroupComponent;
   let radioInstances: StRadioComponent[];
   let testComponent: RadioGroupWithModel;
   let groupNgControl: NgControl;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule],
         declarations: [StRadioComponent, StRadioGroupComponent, RadioGroupWithModel],
         providers: [
            SelectOneDispatcher
         ]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(RadioGroupWithModel);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      groupDebugElement = fixture.debugElement.query(By.directive(StRadioGroupComponent));
      groupNativeElement = groupDebugElement.nativeElement;
      groupInstance = groupDebugElement.injector.get(StRadioGroupComponent);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(StRadioComponent));
      radioNativeElements = radioDebugElements.map((debugEl) => debugEl.nativeElement);
      radioInstances = radioDebugElements.map((debugEl) => debugEl.componentInstance);

      radioLabelElements = radioDebugElements.map((debugEl) => debugEl.query(By.css('label')).nativeElement);
      radioInputElements = radioDebugElements.map((debugEl) => debugEl.query(By.css('input')).nativeElement);

      groupNgControl = groupDebugElement.injector.get(NgControl);


   });

   it('should set individual radio names based on the group name', () => {
      groupInstance.name = 'example';
      fixture.detectChanges();

      expect(groupInstance.name).toBeTruthy();
      for (let radio of radioInstances) {
         expect(radio.name).toBe(groupInstance.name);
      }
   });

   it('should update the group value when one of the radios changes', () => {
      expect(groupInstance.value).toBeFalsy();
      radioInstances[0].checked = true;
      fixture.detectChanges();
      expect(groupInstance.value).toBe('1');
      expect(groupInstance.selected).toBe(radioInstances[0]);
   });

   it('should emit change event when value of group change', () => {
      groupInstance.value = '1';
      radioInstances[1].checked = true;
      fixture.detectChanges();
      expect(groupInstance.value).toBe('2');
      expect(groupInstance.selected).toBe(radioInstances[1]);
   });

   it('should blur about component radio', () => {
      expect(groupNgControl.touched).toBe(false);
      radioInstances[0].onInputBlur();
      fixture.detectChanges();

      expect(groupNgControl.touched).toBe(true);
   });
});


describe('StRadioGroup with FormControl', () => {

    // tslint:disable-next-line:max-classes-per-file
   @Component({
      template: `
         <st-radio-group [formControl]="formControl">
            <st-radio value="1">One</st-radio>
         </st-radio-group>
      `
   })
   class RadioGroup {
      formControl: FormControl = new FormControl();
   }

   let component: RadioGroup;
   let groupDebugElement: DebugElement;
   let groupInstance: StRadioGroupComponent;

   let fixture: ComponentFixture<RadioGroup>;

   let compiled: any;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [
            ReactiveFormsModule,
            FormsModule
         ],
         declarations: [StRadioComponent, StRadioGroupComponent, RadioGroup],
         providers: [
            SelectOneDispatcher
         ]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(RadioGroup);
      groupDebugElement = fixture.debugElement.query(By.directive(StRadioGroupComponent));
      groupInstance = groupDebugElement.injector.get(StRadioGroupComponent);
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;
   });

   describe('When form control marked as disabled', () => {

      it('Should toggle the disabled state', () => {
         component.formControl.disable();
         fixture.detectChanges();
         expect(groupInstance.disabled).toBeTruthy();

         component.formControl.enable();
         fixture.detectChanges();
         expect(groupInstance.disabled).toBeFalsy();

      });

   });

   describe('When add value to the form control', () => {

      it('Should update the component group with the value', () => {
         component.formControl.setValue('example');
         fixture.detectChanges();
         expect(groupInstance.value).toBe('example');
      });

   });


});
