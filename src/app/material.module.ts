import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';




const modules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatTreeModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatListModule,
  MatSidenavModule,
  MatCardModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})


export class MaterialModule {

}
