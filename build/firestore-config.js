"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase-admin/app");
const firebaseConfig = {
    apiKey: "AIzaSyB1r7ZTAp2LygKOF9NApv-5fWN4t2zTziE",
    authDomain: "angularbc-tereza-pudilova.firebaseapp.com",
    projectId: "angularbc-tereza-pudilova",
    storageBucket: "angularbc-tereza-pudilova.appspot.com",
    messagingSenderId: "589611915009",
    appId: "1:589611915009:web:bd908c91d660aabd30ad00",
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
//# sourceMappingURL=firestore-config.js.map