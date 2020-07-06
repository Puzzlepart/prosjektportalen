const uuidV1 = require('uuid/v1')

export default class WaitDialog {
    private title: string;
    private message: string;
    private height: number;
    private width: number;
    private instance: any;
    private ids = {
        title: `${uuidV1()}`,
        message: `${uuidV1()}`,
    };

    constructor(title, message, height, width) {
        this.title = `<span id="${this.ids.title}">${title}</span>`
        this.message = `<span id="${this.ids.message}">${message}</span>`
        this.height = height
        this.width = width
    }

    /**
    * Starts the wait dialog instance
    *
    * @param delay Delay in ms
    */
    public start(delay = 0) {
        window.setTimeout(() => {
            this.instance = SP.UI.ModalDialog.showWaitScreenWithNoClose(this.title, this.message, this.height, this.width)
        }, delay)
    }

    /**
     * Closes the wait dialog instance
     */
    public end() {
        this.instance.close(null)
    }

    /**
     * Updates the wait dialog
     *
     * @param title Title
     * @param message Message
     */
    public update(title?, message?): void {
        if (title.indexOf(',') !== -1) {
            [title, message] = title.split(',')
        }
        if (title) {
            this.updateTitle(title)
        }
        if (message) {
            this.updateMessage(message)
        }
    }

    public updateTitle(title: string): void {
        document.getElementById(this.ids.title).innerHTML = title
    }

    public updateMessage(message: string): void {
        document.getElementById(this.ids.message).innerHTML = message
    }
}
