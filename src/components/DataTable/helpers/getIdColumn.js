export const getIdColumn = (columns) => {
    const columnList = Object.values(columns);
    const idColumn = columnList.find(
        (column) => column.name === 'id' || column.id
    );
    if (!idColumn) {
        throw new Error('Could not find an ID column');
    }
    return idColumn.name;
};
