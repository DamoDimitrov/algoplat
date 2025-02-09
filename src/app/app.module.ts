import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainPageContentComponent } from './pages/main-page-content/main-page-content.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {FooterComponent} from "./components/footer/footer.component";
import {StackModule} from "./pages/stack/stack.module";
import {QueueModule} from "./pages/queue/queue.module";
import {ArrayModule} from "./pages/array/array.module";
import {QuickSortModule} from "./pages/sorting/quick-sort/quick-sort.module";
import { BubbleSortModule } from './pages/sorting/bubble-sort/bubble-sort.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageContentComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [
    ArrayModule,
    QueueModule,
    StackModule,
    QuickSortModule,
    BubbleSortModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'bg',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
