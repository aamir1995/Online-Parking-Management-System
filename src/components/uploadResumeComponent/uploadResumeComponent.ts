import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'resume-component',
    template: require('./uploadResumeComponent.html'),
    styles: [require("./uploadResumeComponent.scss")],
})
export class UploadResumeComponent {
    @Output() resume = new EventEmitter;

    studentAccountForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.studentAccountForm = fb.group({
            'fatherName': '',
            'cnic': '',
            'mobile': '',
            'gender': '',
            'maritalStatus': '',
            'prefaredIndustry': ''
        });
    }

    ngOnInit() { }

    submitForm(value: any): void {
        console.log(value);
        this.resume.emit(value);
    }

}
