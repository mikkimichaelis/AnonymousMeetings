import { AfterViewInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
  styleUrls: ['./group-list.scss'],
})
export class GroupListPage {

  constructor(public platform: Platform,
    public groupsService: GroupsService) { }

  ionViewDidEnter() {
    // this.groupsService.updateGroups();
  };

  attend(id: number) {
    console.log("attend: " + id);
  }

  setDateTime(date: Date, time: string): Date {
    var index = time.indexOf("."); // replace with ":" for differently displayed time.
    var index2 = time.indexOf(" ");

    var hours = Number.parseInt(time.substring(0, index));
    var minutes = Number.parseInt(time.substring(index + 1, index2));

    var mer = time.substring(index2 + 1, time.length);
    if (mer == "PM") {
      hours = hours + 12;
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date;
  }
}