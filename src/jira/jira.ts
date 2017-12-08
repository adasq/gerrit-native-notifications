import {config} from '../../config/config'

const request = require('request');
const fs = require('fs');

interface Config {
    host: string;
    username: string;
    password: string;
    usernames: {};
}

class Jira {
    static AVATAR_ROUTE = 'rest/api/2/user/avatars';
    static AVATAR_SIZE = '48x48';
    static AVATAR_TYPES = ['system', 'custom'];

    private avatars = [];

    private config: Config;

    constructor(config: Config) {
        this.config = config;
        let host = config.host;
        this.config.host = host[host.length - 1] == '/' ? host : host + '/';
    }

    downloadAvatars(user: string, email: string) {
        let url = this.config.host + Jira.AVATAR_ROUTE + '?username=' + user;
        console.log(url);
        let options = {
            url: url,
            headers: {
                'Authorization': 'Basic ' + new Buffer(this.config.username + ':' + this.config.password)
                    .toString('base64'),
                'Content-Type': 'application/json'
            }
        };

        request(options, (error, response, body) => {
            if (!error) {
                let result = JSON.parse(body);
                for (let avatarType of Jira.AVATAR_TYPES) {
                    let isSelected = result[avatarType].filter(avatar => avatar.isSelected == true);
                    if (isSelected.length != 0) {
                        let imageURL = isSelected[0].urls[Jira.AVATAR_SIZE];
                        let imageFileName = user + '_avatar';
                        let imagePath = 'images/' + imageFileName + '.png';

                        let imageURLOptions = options;
                        imageURLOptions.url = imageURL;
                        request(imageURLOptions).pipe(fs.createWriteStream(imagePath))
                            .on('close', () => console.log("Downloaded avatar for " + this.config.username));
                        avatars[email] = imageFileName + '.png';
                    }
                }
            }
        });
    }

    getAvatars() {
        for (let email in this.config.usernames) {
            this.downloadAvatars(this.config.usernames[email], email);
        }

        return this.avatars;
    }
}

export const avatars = new Jira(config.jira).getAvatars();
