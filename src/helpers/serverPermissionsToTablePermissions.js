export const serverPermissionsToTablePermissions = (permissions) => {
    const final = [];

    if (permissions.viewAny) {
        final.push('view', 'edit');
    }

    if (permissions.create) {
        final.push('add');
    }

    return final;
};
