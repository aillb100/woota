import { IRespData } from "../type/http.interface";

const Http = () => {
    const doGet = async (url: string, data:string = ''): Promise<IRespData<any>> => {
        const resp: Response = await fetch(url + '?' + data, {
            method: 'GET'
        });
        return resp.json();
    };

    return {
        doGet
    }
};

const http = Http();
export {
    http
};