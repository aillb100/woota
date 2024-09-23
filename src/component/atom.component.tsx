import { atom, RecoilState } from "recoil";
import { TAlertData } from "../type/data.type";

const stateAlertData: RecoilState<TAlertData> = atom({
    'key': 'stateAlertData',
    default: {} as TAlertData
});

export {
    stateAlertData
};