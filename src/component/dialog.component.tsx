import { useRecoilState } from "recoil";
import { TAlertData } from "../type/data.type";
import { stateAlertData } from "./atom.component";
import { useEffect, useState } from "react";

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

export {
    AlertDialog
}