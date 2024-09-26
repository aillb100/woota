interface IAPIData {
    total: number;
    start: number;
    display: number;
    type: string;
    items: INewsItem[] | IBookItem[];
}

interface INewsItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
};

interface IBookItem {
    author: string;
    description: string;
    discount: number;
    image: string;
    isbn: string;
    link: string;
    pubDate: string;
    publisher: string;
    title: string;
};

export {
    IAPIData,
    INewsItem,
    IBookItem
};