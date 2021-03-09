import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { MonthsComponent } from './componets/months/months.component';
import { FilterBoardComponent } from './componets/filter-board/filter-board.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MonthsService } from './services/months.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MonthsComponent,
    FilterBoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [MonthsService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
