export class Campaign {
    _id?: string;
    name?: string;
    objective?: Number;
    description?: string;
    image?: string;
    category?:string;
    created_by?:string;
    status!:string;
    comments?:any[]
  }