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
        this.config.host = host[host.length - 1] === '/' ? host : host + '/';
    }

    printError(user: string, e: Error) {
        console.error("Unable to download avatar for user %s", user, e);
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

        request(options, (err, resp, body) => {
            if (err) {
                this.printError(user, err);
                return;
            }

            let result;

            try {
                result = JSON.parse(body);
            } catch (e) {
                this.printError(user, e);
                return;
            }

            for (let avatarType of Jira.AVATAR_TYPES) {
                let isSelected = result[avatarType].filter(avatar => avatar.isSelected === true);
                if (isSelected.length !== 0) {
                    let imageURL = isSelected[0].urls[Jira.AVATAR_SIZE];
                    let imageFileName = user + '_avatar';
                    let imagePath = 'images/' + imageFileName;

                    let imageURLOptions = options;
                    imageURLOptions.url = imageURL;
                    request(imageURLOptions).pipe(fs.createWriteStream(imagePath))
                        .on('close', () => console.log("Downloaded avatar for " + user));
                    avatars[email] = imageFileName;
                    break;
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

export const avatars = "jira" in config ? new Jira((config as any).jira).getAvatars() : [];
