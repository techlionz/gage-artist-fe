import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormCheckboxComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FormCheckboxComponent,
    },
  ],
})
export class FormCheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  form!: FormControl;
  @Input() label: string = "";
  @Input() reading: boolean = false;
  @Input() placeholder: string = "";
  @Input() value: string = "";

  onTouched: () => void = () => { };
  onChange: (value: any) => void = () => { };
  subscriptions: Subscription;

  constructor(private fb: FormBuilder) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.form = this.fb.control('', Validators.required);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.allRequiredFieldsFilled(control);
  }

  allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value;
    const isValid = controlValue;
    return isValid ? null : { required: true };
  }

  writeValue(value: any): void {
    value && this.form.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.subscriptions.add(this.form.valueChanges.subscribe(onChange));
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }
}
