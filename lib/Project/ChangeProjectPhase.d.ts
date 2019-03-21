/**
 * Change project phase
 *
 * @param {any} newPhase New phase
 * @param {boolean} useWaitDialog Should a wait dialog be used
 */
declare function ChangeProjectPhase(newPhase: any, useWaitDialog?: boolean): Promise<void>;
export default ChangeProjectPhase;
