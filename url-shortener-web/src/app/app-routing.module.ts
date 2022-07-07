import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateShortURLComponent } from './CreateShortURL/component/create-short-url.component';
import { ShortUrlRedirectionComponent } from './ShortUrlRedirection/component/short-url-redirection.component';
import { ShortUrlRedirectionResolver } from './ShortUrlRedirection/resolver/short-url-redirection.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'createShortUrl', pathMatch: 'full' },
  { path: 'createShortUrl', component: CreateShortURLComponent },
  { path: ':shortURL', component: ShortUrlRedirectionComponent, 
    resolve: { preFetchData: ShortUrlRedirectionResolver }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
