import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'show-jobs-component',
    template: require('./showJobsComponent.html'),
    styles: [require('./showJobsComponent.scss')]
})
export class showJobsComponent {
    @Output() applyForJob = new EventEmitter;
    @Input() jobs;
    @Input() index;
    @Input() uuid;
    constructor() {
    }

    ngOnInit() {
    }

    apply(companyUid: string, jobUid: string) {
        let ids = { 'companyUid': companyUid, 'jobUid': jobUid }
        this.applyForJob.emit(ids);
    }

    checkIfApplied(obj: any) {
        return obj[this.uuid]
    }

}
