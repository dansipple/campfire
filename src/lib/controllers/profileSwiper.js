
import Card from '../models/card';

import User from '../models/user';

import Swipe from '../models/swipe';

import Helpers from './../utils/helpers';

class ProfileSwiperController {

    getProfilesThatSwipedRight(networkId, cardId) {
        return new Promise((resolve, reject) => {
            Swipe.get(`${networkId}/${cardId}`).then((swipes) => {
                let profileArray = [];
                for (let key in swipes) {
                    User.get(key).then((user) => {
                        if(user) {
                            user.id = key;
                            profileArray.push(user);
                        }
                    });
                }
                resolve(profileArray);
            });
        });
    }

}

export default new ProfileSwiperController();