import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellImportPage } from './spell-import';

@NgModule({
  declarations: [
    SpellImportPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellImportPage),
  ],
})
export class SpellImportPageModule {}
