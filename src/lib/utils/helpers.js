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
    },
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
};

export default Helpers;