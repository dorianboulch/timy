import { Component, OnInit } from '@angular/core';
import {ProjectTimeManagerService} from "../shared/services/project-time-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public projectTimeManagerService: ProjectTimeManagerService) { }

  ngOnInit(): void { }

}
