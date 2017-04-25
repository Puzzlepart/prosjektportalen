const GetAllProperties = (): Promise<any> => {
    return new Promise<void>((resolve, reject) => {
        ExecuteOrDelayUntilScriptLoaded(() => {
            let ctx = SP.ClientContext.get_current(),
                pb = ctx.get_web().get_allProperties();
            ctx.load(pb);
            ctx.executeQueryAsync(() => {
                resolve(pb.get_fieldValues());
            }, reject);
        }, "sp.js");
    });
};

export { GetAllProperties };
