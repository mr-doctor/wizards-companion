import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellbookEditPage } from './spellbook-edit';

@NgModule({
  declarations: [
    SpellbookEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellbookEditPage),
  ],
})
export class SpellbookEditPageModule {}
