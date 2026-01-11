



import {AppComponent} from './app.component';
import {Injector, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {createCustomElement} from "@angular/elements";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import {TaskListComponent} from "./components/task-list/task-list.component";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent,TaskListComponent, UserComponent],
	imports: [BrowserModule, HttpClientModule, FormsModule, CommonModule, RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload',
    useHash: true})],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule {
	constructor(private injector: Injector) {}

	ngDoBootstrap() {
		const AppComponentElement = createCustomElement(AppComponent, {
			injector: this.injector,
		});

		customElements.define(
			'tasks',
			AppComponentElement
		);
	}
}
