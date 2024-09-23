interface IRespData<T> {
    data: T;
    statusCode: number;
    statusMessage: string;
};

export {
    IRespData
}