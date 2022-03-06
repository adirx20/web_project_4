// =====>
class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent
        }
    }

    setUserInfo(userData) {
        this._profileName.textContent = userData.name;
        this._profileJob.textContent = userData.about;
    }
}
// <=====

export { UserInfo };