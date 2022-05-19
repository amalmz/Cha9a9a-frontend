import { Campaign } from "./campaign";

export class User {
    _id?: string;
    name?: string;
    lastname?:string;
    email?:string;
    tel?: number;
    roles?: any[];
    verified?:boolean;
    campaign?:Campaign[];
  }