import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout.component';
import {
  ModalComponent,
  MainComponent,
  ColorsComponent,
  TypographyComponent,
  IconsComponent,
  LogoComponent,
  InputComponent,
  ButtonComponent,
  InfoBoxComponent,
  ListComponent,
  SpinnerComponent,
  TwoListSelectionComponent,
  FooterComponent,
  InfoCardComponent,
  TooltipComponent,
  RegexpComponent,
  VerticalMenuComponent,
  HorizontalTabComponent,
  TabBoxComponent,
  ApiDocExample,
  RadioMenuComponent,
  PageTitleComponent,
  SearchComponent
} from '../+examples';
import { routing } from './layout.routing';

import { LoadCodeComponent, ApiDocComponent, ParametersTableComponent } from '../shared';

import { EgeoModule } from '../../../egeo';

@NgModule({
  imports: [CommonModule, routing, FormsModule, EgeoModule],
  declarations: [
    LayoutComponent,
    LoadCodeComponent,
    ParametersTableComponent, ApiDocComponent, // For api doc in examples.
    ModalComponent,
    MainComponent,
    ColorsComponent,
    TypographyComponent,
    IconsComponent,
    LogoComponent,
    InputComponent,
    ButtonComponent,
    InfoBoxComponent,
    ListComponent,
    SpinnerComponent,
    TwoListSelectionComponent,
    FooterComponent,
    InfoCardComponent,
    TooltipComponent,
    RegexpComponent,
    VerticalMenuComponent,
    HorizontalTabComponent,
    TabBoxComponent,
    ApiDocExample,
    RadioMenuComponent,
    PageTitleComponent,
    SearchComponent
  ]
})
export class LayoutModule { }
