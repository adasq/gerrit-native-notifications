import { ignoreList } from '../config/ignore';

export function isIgnored(event){
  return ignoreList.some(fn => fn(event));
}