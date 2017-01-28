import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'post-jobs-component',
    template: require('./postJobsComponent.html'),
    styles: [require("./postJobsComponent.scss")]
})
export class PostJobsComponent {
    @Output() jobDesc = new EventEmitter;

    postJobForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.postJobForm = fb.group({
            'jobTitle': '',
            'vacancies': '',
            'description': '',
            'department': '',
            'category': '',
            'careerLevel': '',
            'salary': '',
            'jobType': ''
        });
    }

    ngOnInit() { }

    submitForm(value: any): void {
        this.jobDesc.emit(value);
    }

}
