import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { selectIsSubmit, selectValidationErrors } from "../../store/reducers";
import { authActions } from "../../store/actions";
import { AuthService } from "../../services/auth.service";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";
import { LoginRequestInterface } from "../../types/loginRequest.interface";

@Component({
  selector: "mc-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private store: Store = inject(Store);
  private authService = inject(AuthService);
  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  data$ = combineLatest({
    isSubmit: this.store.select(selectIsSubmit),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log("form", this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
    this.authService.login(request);
  }
}
