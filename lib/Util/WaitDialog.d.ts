export default class WaitDialog {
    private title;
    private message;
    private height;
    private width;
    private instance;
    private ids;
    constructor(title: any, message: any, height: any, width: any);
    /**
    * Starts the wait dialog instance
    *
    * @param delay Delay in ms
    */
    start(delay?: number): void;
    /**
     * Closes the wait dialog instance
     */
    end(): void;
    /**
     * Updates the wait dialog
     *
     * @param title Title
     * @param message Message
     */
    update(title?: any, message?: any): void;
    updateTitle(title: string): void;
    updateMessage(message: string): void;
}
