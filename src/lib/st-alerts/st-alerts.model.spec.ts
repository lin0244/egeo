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
// import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';

import { StAlert, STALERT_SEVERITY, StAlertLink } from './st-alerts.model';


describe('StAlertsComponent', () => {
   describe('StAlert', () => {

      it('Should be increase opacity, life and decrease opacity', fakeAsync(() => {
         let alert: StAlert = new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, undefined);
         let subscription: Subscription;

         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBe(0);
         });
         subscription.unsubscribe();
         alert.notify();

         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeGreaterThan(0.9);
         });
         subscription.unsubscribe();

         tick(1000);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeGreaterThan(0.9);
         });
         subscription.unsubscribe();


         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeLessThan(0.1);
         });
         subscription.unsubscribe();

         discardPeriodicTasks();
      }));

      it('Should be increase opacity, life, pause life and decrease opacity', fakeAsync(() => {
         let alert: StAlert = new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, undefined);
         let subscription: Subscription;

         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBe(0);
         });
         subscription.unsubscribe();
         alert.notify();

         // Fade in
         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeGreaterThan(0.9);
         });
         subscription.unsubscribe();

         // life
         tick(1000);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeGreaterThan(0.9);
         });
         subscription.unsubscribe();

         // Pause
         alert.pauseNotify();
         tick(3000);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBe(1);
         });
         subscription.unsubscribe();

         // continue
         alert.continueNotify();
         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBe(1);
         });
         subscription.unsubscribe();

         // Fade out
         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeLessThan(0.1);
         });
         subscription.unsubscribe();


         discardPeriodicTasks();
      }));

      it('Should be increase opacity, cancel and decrease opacity', fakeAsync(() => {
         let alert: StAlert = new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, undefined);
         let subscription: Subscription;

         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBe(0);
         });
         subscription.unsubscribe();
         alert.notify();

         // Fade in
         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeGreaterThan(0.9);
         });
         subscription.unsubscribe();

         // cancel
         alert.cancel();

         // Fade out
         tick(500);
         subscription = alert.opacity.subscribe((opacity) => {
            expect(opacity).toBeLessThan(0.1);
         });
         subscription.unsubscribe();


         discardPeriodicTasks();
      }));

      it('Should listen for remove', fakeAsync(() => {
         let alert: StAlert = new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, undefined);
         let responseFunction = jasmine.createSpy('response');
         let subscription: Subscription = alert.removeAlertEvent.subscribe(responseFunction);

         alert.notify();
         tick(3000);

         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledTimes(1);

         discardPeriodicTasks();
      }));

      it('Should be have link', () => {
         let link: StAlertLink = { link: 'test', title: 'test title' };
         let alert: StAlert = new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, link);
      });
   });
});
