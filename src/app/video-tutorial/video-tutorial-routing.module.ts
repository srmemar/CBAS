import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoTutorialComponent } from './video-tutorial.component';

import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
    { path: '', component: VideoTutorialComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideoTutorialRoutingModule { } 

