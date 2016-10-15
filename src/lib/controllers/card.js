
import Card from '../models/card';

import User from '../models/user';

import UserCard from '../models/userCard';

import Helpers from './../utils/helpers';

class CardController {

    create(creatorId, networkId, content, category){
        return new Promise((resolve, reject) => {
            User.getOne(creatorId).then((creatorUserObj) => {
                creatorUserObj._id = creatorId;

                Card.create(networkId,
                    {
                        category: category,
                        content: content,
                        creator: creatorUserObj
                    }
                ).then((ref) => {
                    UserCard.set(`${networkId}/${creatorId}/${ref.key}`, {
                        category: category,
                        content: content,
                        hasInterested: false
                    })
                }).then(resolve).catch(reject);
            }, (err) => {
                reject(err);
            });
        });
    }

    update(creatorId, networkId, cardId, content, category){
        return new Promise((resolve, reject) => {
            User.getOne(creatorId).then((creatorUserObj) => {
                console.log(creatorUserObj);
                creatorUserObj._id = creatorId;

                Card.update(`${networkId}/${cardId}`,
                    {
                        category: category,
                        content: content,
                        creator: creatorUserObj
                    }
                ).then(() => {
                    UserCard.update(`${networkId}/${creatorId}/${cardId}`, {
                        category: category,
                        content: content
                    })
                }).then(resolve).catch(reject);
            }, (err) => {
                reject(err);
            });
        });
    }

    remove(creatorId, networkId, cardId) {
        return new Promise((resolve, reject) => {
            Card.remove(`${networkId}/${cardId}`).then(() => {
                UserCard.remove(`${networkId}/${creatorId}/${cardId}`).then(resolve).catch(reject);
            })
        });
    }

}

export default new CardController();