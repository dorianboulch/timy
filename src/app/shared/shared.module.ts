import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, ProjectListComponent} from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ProjectItemComponent } from "./components/project-item/project-item.component";
import {ProjectStorageService} from "./services/project-storage.service";
import { ProjectNewItemComponent } from './components/project-new-item/project-new-item.component';
import { BeautifulSecondsPipe } from './pipes/beautiful-seconds.pipe';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ProjectListComponent, ProjectItemComponent, ProjectNewItemComponent, BeautifulSecondsPipe],
  imports: [CommonModule, TranslateModule, FormsModule, FontAwesomeModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ProjectListComponent, BeautifulSecondsPipe],
  providers: [
    ProjectStorageService
  ]
})
export class SharedModule {}
