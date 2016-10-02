const Helpers = {

    objectToArray(obj) {
        return new Promise(function(resolve) {
            let newArr = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key].id = key;
                    newArr.push(obj[key]);
                }
            }
            resolve(newArr);
        });
    }
};

export default Helpers;