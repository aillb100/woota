import { IBookItem, INewsItem } from "./data.interface";

type TAlertData = {
    show: boolean;
    title: string;
    message: string;
    callback?: Function;
};

type TPopData = {
    show: boolean;
    type: string;
    data: INewsItem | IBookItem
};

export {
    TAlertData,
    TPopData
};