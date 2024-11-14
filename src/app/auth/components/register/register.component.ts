import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { selectIsSubmit, selectValidationErrors } from "../../store/reducers";
import { authActions } from "../../store/actions";
import { AuthService } from "../../services/auth.service";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component";

@Component({
  selector: "mc-register",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  private store: Store = inject(Store);
  private authService = inject(AuthService);
  form = this.fb.nonNullable.group({
    username: ["", Validators.required],
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
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request);
  }
}
