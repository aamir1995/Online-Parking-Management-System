import { AuthProviders, AuthMethods } from 'angularfire2';

export class AppConfig {
    config: {
        firebaseConfig: { apiKey: string, authDomain: string, databaseURL: string, storageBucket: string },
        firebaseAuthConfig: { provider: any, method: any };
    };

    constructor(env: string = 'dev') {
        if (env === 'dev') {
            this.config = {
                'firebaseConfig': {
                    apiKey: "AIzaSyABwgNnaxai154SUli__wW3OCGuUb2wNgU",
                    authDomain: "onlineparkingsystem-12aa7.firebaseapp.com",
                    databaseURL: "https://onlineparkingsystem-12aa7.firebaseio.com",
                    storageBucket: "onlineparkingsystem-12aa7.appspot.com"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        } else {
            this.config = {
                'firebaseConfig': {
                    apiKey: "AIzaSyABwgNnaxai154SUli__wW3OCGuUb2wNgU",
                    authDomain: "onlineparkingsystem-12aa7.firebaseapp.com",
                    databaseURL: "https://onlineparkingsystem-12aa7.firebaseio.com",
                    storageBucket: "onlineparkingsystem-12aa7.appspot.com"
                },
                firebaseAuthConfig: { provider: AuthProviders.Password, method: AuthMethods.Password }
            };
        }
    }
}

export let appConfig = new AppConfig('dev');
