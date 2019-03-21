import DoesWebExist from "./DoesWebExist";
import SetSharedNavigation from "./SetSharedNavigation";
import IProvisionContext from "../IProvisionContext";
/**
 * Creates a new subsite
 *
 * @param {IProvisionContext} context Provisioning context
 */
declare function CreateWeb(context: IProvisionContext): Promise<IProvisionContext>;
export { DoesWebExist, SetSharedNavigation, CreateWeb, };
