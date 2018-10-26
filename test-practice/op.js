module.exports.isNull = (value) => {
    return (value == null) ? true : false;
}

module.exports.isEmpty = (value) => { 
    return (value == "") ? true : false;
}

module.exports.isUndefined = (value) => {
    return (value == undefined) ? true : false;
}

module.exports.isString = (value) => {
    return (typeof(value) == "string") ? true : false;
}

module.exports.isNumber = (value) => {
    return (typeof value == "number") ? true : false;
}

module.exports.isBoolean = (value) => {
    return (typeof value == "boolean") ? true : false;
}

module.exports.getData = (value) => {
    return value;
}