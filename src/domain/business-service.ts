import {emailAdapter} from "../adapters/email-adapter";
import {emailManager} from "../managers/email-manager";

export const businessService = {
    async doOperation() {
        //save to repo
        // get user from repo
        await emailManager.sendPasswordRecoveryMessage({})
    },

    async doOperation2() {
        //save to repo
        // get user from repo
        await emailAdapter.sendEmail("user.email", "password recovery", "<div>${user.recoveryCode}message</div>")
    }
}