import { Component, ViewEncapsulation, Input, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from 'src/components/default-class/value-accessor';
import { CheckboxModel } from 'src/components/checkbox/checkbox.model';

@Component({
  selector: 'abc-checkbox',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.scss'],
  templateUrl: 'checkbox.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true,
  }],
})

export  class CheckboxComponent implements OnInit {
  @Input() items: CheckboxModel;
  @Input() label: string;
  @Input() icon: string;
  @ViewChild(NgModel, {static: false}) model: NgModel;
  @Input() checked = false;
  @Input() initValue: string | number | boolean;
  public selected: string;
  public loaded = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  ngOnInit() {

  }

  selectItem() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
