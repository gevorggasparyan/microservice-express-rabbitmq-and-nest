export interface IUser {
    id: string;
    name: string;
    surname: string;
    age: number;
    gender: string;
    problems: boolean;
}

export interface IMessage {
    userId: string;
    newData: Partial<IUser>;
}


export interface PaginationGetAll {
    page: number;
    limit: number;
    totalPages: number;
}
