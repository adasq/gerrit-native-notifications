import * as through2 from 'through2';
import * as fs from 'fs';
import * as path from 'path';

const PATH = path.join(__dirname, '../../../stream');

export function TO_FILE() {
    return fs.createWriteStream(PATH, {flags: 'a'});
};