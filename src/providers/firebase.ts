import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as fb from 'firebase';
import { FirebaseApp, AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import "rxjs/add/operator/take";


@Injectable()
export class FirebaseService {
    uuid: string;
    accountType: string;
    // private ref: fb.database.Reference;
    // private storage: fb.storage.Reference;
    // private auth: fb.auth.Auth;
    // public firebaseTimeStamp = fb.database['ServerValue'].TIMESTAMP;

    constructor(private af: AngularFire, private router: Router) {
        this.checkUserAuth()
            .subscribe(auth => {
                if (auth !== null) { this.uuid = auth.uid };
            });

    };

    getUserDetails() {
        return this.af.database.object('users/' + this.uuid)
            .take(1);
    }

    getMyBookings() {
        return this.af.database.list('userBookings/' + this.uuid);
    }
    getAllRes() {
        return this.af.database.list('allRes/');
    }

    delUserBooking(postObj: string) {
        let obj = {};
        console.log("from service", postObj)
        obj['allBookings/' + postObj['location'] + "/" + postObj['slot'] + '/' + postObj['key']] = null;
        obj['allRes/' + postObj['key']] = null;
        obj['userBookings/' + postObj['uid'] + "/" + postObj['key']] = null;

        return this.af.database.object('').update(obj);
    }

    saveFeedback(feedbackObj: Object) {
        feedbackObj['uuid'] = this.uuid;
        return this.af.database.list('feedbacks/').push(feedbackObj);
    }

    getAllFeedbacks() {
        return this.af.database.list("feedbacks");
    }

    bookSlot(slotObj) {
        slotObj['uid'] = this.uuid;

        let pushKey = firebase.database().ref().push();

        let obj = {};

        obj['allBookings/' + slotObj['selectedLocation'] + '/' + slotObj['selectedSlot'] + '/' + pushKey.key] = slotObj;
        obj['allRes/' + pushKey.key] = slotObj;
        obj['userBookings/' + this.uuid + "/" + pushKey.key] = slotObj;

        return this.af.database.object('').update(obj);
    }

    getSpecificCompanyJobs(uuid: string) {
        return this.af.database.list('jobsByCompanies/' + uuid)
    }

    getAllReservations() {
        return this.af.database.list('allBookings/')
    }

    checkUserAuth() {
        return this.af.auth;
    }

    replyToFeedback(feedbackObj) {
        return this.af.database.object('feedbacks/' + feedbackObj.postKey + "/" + "reply").set(feedbackObj.replyText)
    }

    returnAccountType() {
        return this.af.database
            .object(`users/${this.uuid}`)
    };

    getAllCandidates(postUId) {
        return this.af.database.object('jobsByCompanies/' + this.uuid + '/' + postUId);
    }

    saveJobDetail(jobObj: Object) {
        jobObj['postedOn'] = firebase.database['ServerValue'].TIMESTAMP;
        jobObj['uid'] = this.uuid;
        jobObj['appliedCandidates'] = "";

        let pushKey = firebase.database().ref().push();

        let obj = {};

        obj['jobsByCompanies/' + this.uuid + '/' + pushKey.key] = jobObj;
        obj['allJobs/' + pushKey.key] = jobObj;

        return firebase.database().ref().update(obj)
    }

    logOutUser() {
        return Promise.resolve(this.af.auth.logout());
    }

    signup(email: string, password: string) {
        return this.af.auth.createUser({ 'email': email, 'password': password });
    };

    applyForJob(companyUid: string, postUid) {
        this.af.database.object('users/' + this.uuid)
            .take(1)
            .subscribe(data => {
                if (data.status) {
                    let userData = { 'firstname': data.firstName, 'lastname': data.lastName, 'gender': data.gender, 'cnic': data.cnic, 'mobile': data.mobile };
                    let obj = {};
                    let userObj = { [this.uuid]: userData };
                    obj['jobsByCompanies/' + companyUid + '/' + postUid + "/appliedCandidates"] = userObj;
                    obj['allJobs/' + postUid + "/appliedCandidates"] = userObj;
                    return firebase.database().ref().update(obj);
                } else {
                    this.router.navigate(['resume']);
                    return alert("Oh Snap! You Haven't uploaded your resume yet, Please Upload it ASAP!");
                }
            })
    }

    login(email: string, password: string) {
        return this.af.auth.login({ 'email': email, 'password': password })
    };

    saveExtraDetails(uid, detailsObject: Object) {
        detailsObject['type'] = 2;
        console.log(detailsObject);
        return this.af.database.object(`users/${uid}`)
            .set(detailsObject);
    };

    uploadResumeToFirebase(resumeObj: Object) {
        resumeObj['status'] = true;
        return this.af.database.object(`users/${this.uuid}`)
            .update(resumeObj);
    };

    getAllJobs() {
        return this.af.database.list(`allJobs/`);
    }

    // saveMultipath(multipath) {
    //     return this.ref.update(multipath);
    // } // saveMultipath

    // getPushRef(path) {
    //     return this.ref.child(path).push();
    // }

    // uploadImageOnStorageBase64(path, image: string): Promise<string> {
    //     return new Promise(res => {
    //         this.storage.child(path).putString(image, 'base64')
    //             .then((snapshot) => {
    //                 console.log('Uploaded a base64 string!');
    //                 // The promise will resolve with a Download URL provided by Firebase Storage
    //                 res(snapshot.downloadURL);
    //             });
    //     });
    // }

    // uploadImageOnStorageBlob(path, blob): Promise<string> {
    //     return new Promise(res => {
    //         this.storage.child(path).put(blob).then((snapshot) => {
    //             console.log('Uploaded a blob or file!');
    //             // The promise will resolve with a Download URL provided by Firebase Storage
    //             res(snapshot.downloadURL);
    //         })
    //     });
    // }

}

// export const firebase = new FirebaseService();