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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StDemoGeneratorModule } from '../../utils/demo-generator/demo-generator.module';
import { StSearchModule } from '../st-search.module';
import { StSearchComponent } from '../st-search.component';
import { StSearchDemoComponent } from './st-search-demo';


@NgModule({
   imports: [
      CommonModule,
      StSearchModule,
      FormsModule,
      StDemoGeneratorModule.withComponents({ components: [StSearchDemoComponent, StSearchComponent] })
   ],
   declarations: [StSearchDemoComponent]
})
export class StSearchDemoModule { }
