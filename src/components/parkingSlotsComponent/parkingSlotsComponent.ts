import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'parking-slots-component',
    template: require('./parkingSlotsComponent.html'),
    styles: [require("./parkingSlotsComponent.scss")]
})
export class ParkingSlotsComponent {
    @Output() bookSlot = new EventEmitter;
    bookSlotForm: FormGroup;
    selectedSlot: number;
    slots: any[] = [0, 1, 2, 3, 4, 5, 6, 7];
    hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    selectHours = [1, 2, 3, 4, 5, 6];

    constructor(private fb: FormBuilder) {
        this.bookSlotForm = fb.group({
            'date': "2017-01-12",
            'startHours': 6,
            'selectHours': 3,
            'selectedSlot': ''
        });
    };

    slotButton(slotIndex) {
        this.selectedSlot = slotIndex;
        console.log(this.selectedSlot, "ada", slotIndex);
    };


    ngOnInit() { }

    submitForm(value: any): void {
        console.log(value);
        if (!this.selectedSlot) {
            alert("Please select a parking slot first");
            return;
        }
        value['selectedSlot'] = this.selectedSlot;
        this.bookSlot.emit(value);
    };

}
