import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageContentComponent } from './pages/main-page-content/main-page-content.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {StackComponent} from "./pages/stack/stack.component";
import {StackModule} from "./pages/stack/stack.module";
import {QueueComponent} from "./pages/queue/queue.component";
import {ArrayComponent} from "./pages/array/array.component";

import {QuickSortComponent} from "./pages/sorting/quick-sort/quick-sort.component";
import { BubbleSortComponent } from './pages/sorting/bubble-sort/bubble-sort.component';

const routes: Routes = [
  { path: '', component: MainPageContentComponent },
  {
    path: 'home',
    component: MainPageContentComponent,
  },
  {
    path: 'sorting',
    children: [
      {
        path: 'quickSort',
        component: QuickSortComponent
      },
      {
        path: 'bubbleSort',
        component: BubbleSortComponent
      },
      {
        path: 'mergeSort',
        component: QuickSortComponent
      }
    ]
  },
  {
    path: 'searching',
    children: [
      {
        path: 'sequentialSearch',
        component: QuickSortComponent
      },
      {
        path: 'binarySearch',
        component: QuickSortComponent
      }
    ]
  },
  {
    path: 'stack',
    component: StackComponent,
  },
  {
    path: 'queue',
    component: QueueComponent,
  },
  {
    path: 'array',
    component: ArrayComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
