import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { AttendancePage } from '../attendance/attendance';
import { MeetingListPage } from '../meeting-list/meeting-list';
import { MapPage } from '../map/map';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'attendance',
        children: [
          {
            path: '',
            component: AttendancePage,
          }
          ,
          {
            path: 'attend/:attendanceId',
            loadChildren: () => import('../attendance-detail/attendance-detail.module').then(m => m.AttendanceDetailModule)
          }
        ]
      },
      {
        path: 'meetings',
        children: [
          {
            path: '',
            component: MeetingListPage,
          },
          {
            path: 'meeting/:meetingId',
            loadChildren: () => import('../meeting-detail/meeting-detail.module').then(m => m.MeetingDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            component: MapPage,
          }
        ]
      },
      // {
      //   path: 'speakers',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../meeting-list/meeting-list.module').then(m => m.MeetingListModule)
      //     },
      //     {
      //       path: 'meeting-details/:meetingId',
      //       loadChildren: () => import('../meeting-detail/meeting-detail.module').then(m => m.MeetingDetailModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'map',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../map/map.module').then(m => m.MapModule)
      //     }
      //   ]
      // },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      // {
      //   path: '',
      //   redirectTo: '/app/tabs/schedule',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

