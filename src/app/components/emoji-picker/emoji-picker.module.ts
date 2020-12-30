import { NgModule } from '@angular/core';
import { EmojiPickerComponent } from './emoji-picker';

@NgModule({
  declarations: [
    EmojiPickerComponent,
  ],
  entryComponents: [EmojiPickerComponent],
  exports: [
    EmojiPickerComponent
  ]
})
export class EmojiPickerComponentModule {
}
