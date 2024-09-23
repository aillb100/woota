interface INewsData {
    total: number;
    start: number;
    display: number;
    type: string;
    items: INewsItem[];
}

interface INewsItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
};

export {
    INewsData,
    INewsItem
};