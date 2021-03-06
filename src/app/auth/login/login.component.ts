import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../auth.service";
import { fadeTrigger } from "src/app/shared/route-animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeTrigger]
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;

  state: string;

  isLoading = false;

  constructor(public authService: AuthService, private route: ActivatedRoute) {
    //FETCH STATE FROM ROUTE LINK TO SET LOGIN GREETING FOR STARRED FEATURE
    this.route.params.subscribe(param => (this.state = param["state"]));
  }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => (this.isLoading = false));
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
