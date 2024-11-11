import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { register } from "../../store/actions";
import { RegisterRequestInterface } from "../../types/register.interface";
import { RouterLink } from "@angular/router";

@Component({
  selector: "mc-register",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  private store: Store = inject(Store);
  form = this.fb.nonNullable.group({
    username: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log("form", this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  }
}
