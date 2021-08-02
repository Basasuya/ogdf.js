export function getDefaultValueOfParameters(parameters) {
    const result = {}
    Object.keys(parameters).forEach((key) => {
        result[key] = parameters[key].default
    })
    return result
}

export const PARAMETER_TYPE = {
    CATEGORICAL: 'CATEGORICAL',
    INT: 'INT',
    DOUBLE: 'DOUBLE',
    BOOL: 'BOOL'
}
