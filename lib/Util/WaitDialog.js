"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidV1 = require("uuid/v1");
class WaitDialog {
    constructor(title, message, height, width) {
        this.ids = {
            title: `${uuidV1()}`,
            message: `${uuidV1()}`,
        };
        this.title = `<span id="${this.ids.title}">${title}</span>`;
        this.message = `<span id="${this.ids.message}">${message}</span>`;
        this.height = height;
        this.width = width;
    }
    /**
    * Starts the wait dialog instance
    *
    * @param delay Delay in ms
    */
    start(delay = 0) {
        window.setTimeout(() => {
            this.instance = SP.UI.ModalDialog.showWaitScreenWithNoClose(this.title, this.message, this.height, this.width);
        }, delay);
    }
    /**
     * Closes the wait dialog instance
     */
    end() {
        this.instance.close(null);
    }
    /**
     * Updates the wait dialog
     *
     * @param title Title
     * @param message Message
     */
    update(title, message) {
        if (title.indexOf(",") !== -1) {
            [title, message] = title.split(",");
        }
        if (title) {
            this.updateTitle(title);
        }
        if (message) {
            this.updateMessage(message);
        }
    }
    updateTitle(title) {
        document.getElementById(this.ids.title).innerHTML = title;
    }
    updateMessage(message) {
        document.getElementById(this.ids.message).innerHTML = message;
    }
}
exports.default = WaitDialog;
