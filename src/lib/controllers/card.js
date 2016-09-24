
import Card from '../models/card';

import User from '../models/user';

import UserCard from '../models/userCard';

import Helpers from './../utils/helpers';

class CardController {

    create(networkId, content, category, creatorId){
        return new Promise((resolve, reject) => {
            User.get(creatorId).then((creatorUserObj) => {
                creatorUserObj.uid = creatorId;

                Card.create(networkId,
                    {
                        category: category,
                        content: content,
                        creator: creatorUserObj
                    }
                ).then((ref) => {
                    UserCard.set(networkId+'/'+creatorId+'/'+ref.key, {
                        category: category,
                        content: content
                    })
                }).then(resolve).catch(reject);
            }, (err) => {
                console.log(err)
            });
        });
    }

}

export default new CardController();