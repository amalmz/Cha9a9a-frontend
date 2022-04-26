
export interface Comment {
    _id: string;
    text: string;
    createdAt:string;
    user:{
        name:string,
        lastname:string,
    };
  }