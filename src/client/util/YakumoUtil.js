class ClientUtil {
    constructor(client) {
        this.client = client;
    }

    trimArray(array, trim) {
        if (array.length > trim) {
            const len = array.length - trim;
            array = array.slice(0, trim);
            array.push(`${len} more...`);
        }
        return array;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

module.exports = ClientUtil;