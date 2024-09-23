import React, { ChangeEvent, useState } from "react";
import { AlertDialog } from "../component/dialog.component";
import { useRecoilState } from "recoil";
import { TAlertData } from "../type/data.type";
import { stateAlertData } from "../component/atom.component";
import { IRespData } from "../type/http.interface";
import { http } from "../tools/http.tools";
import { INewsData, INewsItem } from "../type/data.interface";
import { su } from "../tools/string.tools";
import moment from "moment";

const List = () => {
    const [tab, setTab] = useState<string>('01');
    const [alertData, showAlert] = useRecoilState<TAlertData>(stateAlertData);
    const [keyword, setKeyword] = useState<string>('');
    const [news, setNews] = useState<INewsData | null>(null);

    const clickTab = (e: React.MouseEvent<HTMLDivElement>) => {
        const tabDiv = e.target as HTMLDivElement;
        setTab(tabDiv.dataset.tabId as string);
    };

    const clcikSearch = () => {
        if(keyword.trim() === '') {
            showAlert({
                show: true,
                title: '알림',
                message: '검색어를 입력해주세요'
            });
        }
        callApi();
    };

    const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value || '');
    }

    const callApi = async () => {
        const url: string = '/api/data';
        const data: string = 'type=news&keyword=' + keyword;

        const resp: IRespData<INewsData> = await http.doGet(url, data);
        const oldStr = '안녕하세요. <b>순살아파트</b> 입니다';
        const newStr = oldStr.replace(/<[^>]*>?/g, '');

        if(resp.statusCode !== 200) {
            showAlert({
                show: true,
                title: '오류 알림',
                message: '뉴스 조회 시 살짝 오류가 발생했어요. 잠시 후에 다시 시도해주세요'
            });
        }
        setNews(resp.data);
    };

    return (
        <>
            <div className="page">
                {/* SearchBar Component */}
                <div className="searchBar">
                    <span>
                        <input type="text" id="keyword" className="keyword" onChange={ changeKeyword } />
                    </span>
                    <span>
                        <button className="btnSearch" onClick={ clcikSearch }></button>
                    </span>
                </div>

                {/* List */}
                <div className="contents">
                    <ul className="listview">
                    {
                        news && news.items && news.items.length > 0 ?
                            news.items.map((item: INewsItem) => {
                                let title: string = su.unescape(su.stripTag(item.title));
                                title = title.length > 20 ? title.substring(0, 20) + '...' : title;
                                let desc: string = su.unescape(su.stripTag(item.description));
                                desc = desc.length > 50 ? desc.substring(0, 40) + '...' : desc;
                                const pubDate: string = moment(item.pubDate).format('YYYY-MM-DD HH:mm');

                                return <li className="newsRow">
                                    <span className="title ellipsis">{ title }</span>
                                    <span className="date">{ pubDate }</span>
                                    <span className="desc ellipsis">{ desc }</span>
                                </li>
                            })
                        :
                            <li className="nodata">
                                <span>조회한 뉴스가 없습니다</span>
                            </li>
                    }
                    </ul>
                </div>

                {/* Tab Component */}
                <div className="tabBar">
                    <div className={'tab' + (tab === '01' ? ' on' : '')} 
                        data-tab-id="01" onClick={ clickTab }>
                        뉴스
                    </div>
                    <div className={'tab' + (tab === '02' ? ' on' : '')} 
                        data-tab-id="02" onClick={ clickTab }>
                        도서
                    </div>
                </div>
            </div>
            {
                alertData && alertData.show && <AlertDialog />
            }
        </>
    )
};

export default List;