import {DataMapper} from "@aws/dynamodb-data-mapper";

import User from "../models/User";

module.exports = class UserDao {
    dynamoDBMapper: DataMapper;

    constructor(dynamoDBMapper: DataMapper) {
        this.dynamoDBMapper = dynamoDBMapper;
    }

    async getUser(id: string) {
        return this.dynamoDBMapper.query(User, {
            id: id
        });
    }

    async saveUser(user: User) {
        this.dynamoDBMapper.put(user).then(objectSaved => {
            console.log(`User saved to DynamoDB`, objectSaved);
            return objectSaved;
        }).catch(err => {
            console.error("An error occurred saving User", user, err);
            return null;
        })
    }
};