import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellbookPage } from './spellbook';

@NgModule({
  declarations: [
    SpellbookPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellbookPage),
  ],
})
export class SpellbookPageModule {}
