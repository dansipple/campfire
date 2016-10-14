const Helpers = {

    objectToArray(obj) {
        return new Promise((resolve) => {
            let newArr = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key]._id = key;
                    newArr.push(obj[key]);
                }
            }
            resolve(newArr);
        });
    },
    filterDeleted(arr) {
        return new Promise((resolve) => {
            const filteredArray = arr.filter((obj) => {
                return typeof obj.deletedAt !== 'number';
            });
            resolve(filteredArray);
        });
    }
};

export default Helpers;