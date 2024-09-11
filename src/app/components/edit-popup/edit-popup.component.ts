import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharacterValidator()]],
      price: ['', [Validators.required]],
      image: [''],
      rating: [0],
    });
  }

  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    id: 0,
    name: '',
    price: '',
    image: '',
    rating: 0,
  };

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Product>();

  public productForm;

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const regex = /^[a-zA-Z0-9\s]*$/;
      const valid = regex.test(control.value);
      return valid ? null : { specialCharacter: true };
    };
  }

  ngOnChanges(): void {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const { name, price, image, rating } = this.productForm.value;
    console.warn(name, price, image, rating);

    this.confirm.emit({
      id: this.product.id,
      name: name || '',
      price: price || '',
      image: image || '',
      rating: rating || 0,
    });
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
