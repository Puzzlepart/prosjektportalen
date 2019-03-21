export interface IPreferencesParameter {
    _: string;
    $: {
        Key: string;
    };
}
declare const _default: {
    _preferences: any;
    /**
     * Get parameter
     *
     * @param {string} key Key of the parameter
     */
    getParameter(key: string): string;
};
export default _default;
