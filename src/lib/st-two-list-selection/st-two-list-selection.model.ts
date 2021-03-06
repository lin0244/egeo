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
import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export interface StTwoListSelectionElement {
   id: string | number;
   name: string;
   selected?: boolean;
   extraLabel?: string;
}

export interface StTwoListSelectExtraLabelAction {
   element: StTwoListSelectionElement;
   event: Event;
}

export interface StTwoListSelectionAction {
   element: StTwoListSelectionElement;
   position: number;
}

export interface StTwoListSelectionConfig {
   allElementsListTitle: string;
   allElementsSearchPlaceholder: string;
   selectedElementsListTitle: string;
   selectedElementsSearchPlaceholder: string;
}

export interface StTwoListSelectionConfigSchema {
   allElementsListTitle: TranslateableElement;
   allElementsSearchPlaceholder: TranslateableElement;
   selectedElementsListTitle: TranslateableElement;
   selectedElementsSearchPlaceholder: TranslateableElement;
}
