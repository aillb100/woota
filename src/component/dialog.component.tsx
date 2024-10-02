import { useRecoilState } from "recoil";
import { TAlertData, TPopData } from "../type/data.type";
import { stateAlertData, statePopData } from "./atom.component";
import { useEffect, useState } from "react";
import { IBookItem, INewsItem, IDetail } from "../type/data.interface";
import moment from "moment";

const AlertDialog = () => {
    const [alertData, setAlertData] = useRecoilState<TAlertData>(stateAlertData);
    const [on, setOn] = useState<boolean>(false);

    const title: string = alertData.title;
    const message: string = alertData.message;
    const callback: Function = alertData.callback || (() => {});

    useEffect(() => {
        setTimeout(() => setOn(true), 200);
    }, []);

    const clickClose = () => {
        setOn(false);
        setTimeout(() => {
            setAlertData({} as TAlertData);
            callback && callback();
        }, 200);
    };

    return (
        <div className="alertBox">
            <div className="alertAlign">
                <div className={ "alertDialog" + (on ? ' on' : '') }>
                    <div className="alertHeader">
                        <span>{ title }</span>
                    </div>

                    <div className="alertBody">
                        <span>{ message }</span>
                    </div>

                    <div className="alertButtons">
                        <button type="button" className="alertClose" 
                            onClick={ clickClose }></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const PopupDialog = () => {
    const [popData, setPopData] = useRecoilState<TPopData>(statePopData);
    const [on, setOn] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setOn(true), 200);
    }, []);

    const detail: IDetail = {} as IDetail;
    if(popData.type === 'news') {
        const curData: INewsItem = popData.data as INewsItem;
        detail.header = curData.title;
        detail.attach = moment(curData.pubDate).format('YYYY.MM.DD HH:mm');
        detail.body = curData.description;
        detail.link = curData.link;
    } else {
        const curData: IBookItem = popData.data as IBookItem;
        detail.header = curData.title;
        detail.attach = curData.author;
        detail.body = curData.description;
        detail.link = curData.link;
        detail.publisher = curData.publisher;
        detail.discount = curData.discount;
        detail.image = curData.image;
    }

    const clickClose = () => {
        setOn(false);
        setTimeout(() => setPopData({} as TPopData), 200);
    };

    return (
        <div className="popBox">
            <div className="popAlign">
                <div className={ 'popDialog' + (on ? ' on' : '') }>
                    <div className="popHead">
                        <span dangerouslySetInnerHTML={{ __html: detail.header}}></span>
                        <button type="button" className="btnClose"
                            onClick={ clickClose } />
                    </div>

                    <div className="popBody">
                        <span className="attach">{ detail.attach }</span>
                        {
                            popData.type === 'book' &&
                            <>
                                <span className="additional">
                                    { detail.publisher } ({ detail.discount + '원' })
                                </span>
                                <span className="thumb">
                                    <img src={ detail.image } />
                                </span>
                            </>
                        }
                        <span dangerouslySetInnerHTML={{ __html: detail.body }}></span>
                    </div>

                    <div className="popButtons">
                        <a href={ detail.link } target="_blank"
                            className="btnLink">링크</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export {
    AlertDialog,
    PopupDialog
}