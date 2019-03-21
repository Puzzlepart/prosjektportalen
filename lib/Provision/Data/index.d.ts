import IProvisionContext from "../IProvisionContext";
/**
 * Copies default data from source to destination
 *
 * @param {IProvisionContext} context Provisioning context
 */
declare function CopyDefaultData(context: IProvisionContext): Promise<void>;
export { CopyDefaultData };
