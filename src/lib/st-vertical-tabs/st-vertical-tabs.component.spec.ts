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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Http } from '@angular/http';
import { By } from '@angular/platform-browser';

import { StVerticalTabsComponent } from './st-vertical-tabs.component';


let comp: StVerticalTabsComponent;
let fixture: ComponentFixture<StVerticalTabsComponent>;
let de: DebugElement;

let fakeOptions: string[] = ['tab 1', 'tab 2', 'tab 3'];
let qaTag: string = 'vertical-tabs';


describe('StVerticaltabsComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StVerticalTabsComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StVerticalTabsComponent);
      comp = fixture.componentInstance;

      // Initialize values
      comp.options = fakeOptions;
      comp.qaTag = qaTag;

   });

   describe('when it is initialized', () => {
      it('if active option is not defined, first option is activated', () => {
         comp.activeOption = undefined;
         fixture.detectChanges();

         expect(comp.isActive(fakeOptions[0])).toBeTruthy();
         expect(comp.activeOptionIndex).toBe(0);
      });

      it('should active first option if option not exists', () => {
         let activeOptionName = 'not existing option';
         comp.activeOption = activeOptionName;

         fixture.detectChanges();

         expect(comp.isActive(activeOptionName)).toBeFalsy();
         expect(comp.isActive(fakeOptions[0])).toBeTruthy();
      });

      it('should test when qaTag is not passed', () => {
         comp.qaTag = undefined;
         try {
            fixture.detectChanges();
         } catch (error) {
            expect(error.message).toContain('qaTag is a required field');
         }
      });

      it('should test when options is not passed', () => {
         comp.options = undefined;
         try {
            fixture.detectChanges();
         } catch (error) {
            expect(error.message).toContain('options is a required field');
         }
      });
   });

   describe('should be able to activate an option', () => {
      let activeOptionIndex = 2;
      let activeOptionName = fakeOptions[activeOptionIndex];

      it('when active option is changed, its position and name are updated', fakeAsync(() => {
         spyOn(comp, 'activateOption').and.callThrough();
         fixture.detectChanges();

         let link: HTMLAnchorElement = fixture.debugElement.query(By.css(`#${qaTag}-tab-2`)).nativeElement;
         link.dispatchEvent(new Event('click'));
         fixture.detectChanges();
         tick();

         expect(comp.activateOption).toHaveBeenCalledWith(activeOptionName);
         expect(comp.activeOptionIndex).toEqual(activeOptionIndex);
      }));

      it('when active option is changed, an event is emitted with the active option name', fakeAsync(() => {
         fixture.detectChanges();

         let outputOption: string = '';
         comp.changeOption.subscribe((option: string) => outputOption = option);

         let link: HTMLAnchorElement = fixture.debugElement.query(By.css(`#${qaTag}-tab-2`)).nativeElement;
         link.dispatchEvent(new Event('click'));
         fixture.detectChanges();
         tick();

         expect(outputOption).toEqual(fakeOptions[2]);
      }));

      it('when active option is changed from outside, refresh state', () => {
         fixture.detectChanges();

         let outputOption: string = '';
         comp.changeOption.subscribe((option: string) => outputOption = option);

         comp.activeOption = fakeOptions[3];
         comp.ngOnChanges({ activeOption: { currentValue: 'tab 3' } });
         fixture.detectChanges();

         expect(comp.activeOptionIndex).toEqual(2);
      });
   });
});
