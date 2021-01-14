const methods = {};

methods.filterData = (res) => {
    try {
        const {
            payload,
            referenceData
        } = res;
        const values = payload.value;
        const result = transform(values, referenceData);
        return result;
    } catch (err) {
        return err;
    }

};

function transform(val, refData) {
    val.forEach((value) => {
        if (typeof value.value === 'string') {
            replaceFunction(value, refData)
        } else {
            transform(value.value, refData);
        }
    });
    return val
};

function replaceFunction(data, refData) {
    const response = data.value;
    const result = response.split('{').pop().split('}')[0];
    if (result in refData) {
        data.value = data.value.replace(`{${result}}`, refData[result])
    };
    return;
};

module.exports = methods;
