import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellEditPage } from './spell-edit';

@NgModule({
  declarations: [
    SpellEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellEditPage),
  ],
})
export class SpellEditPageModule {}
