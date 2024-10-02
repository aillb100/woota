import { atom, RecoilState } from "recoil";
import { TAlertData, TPopData } from "../type/data.type";

const stateAlertData: RecoilState<TAlertData> = atom({
    'key': 'stateAlertData',
    default: {} as TAlertData
});

const statePopData: RecoilState<TPopData> = atom({
    'key': 'statePopData',
    default: {} as TPopData
});

export {
    stateAlertData,
    statePopData
};