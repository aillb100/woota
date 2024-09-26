import React, { ChangeEvent, useEffect, useState } from "react";
import { AlertDialog } from "../component/dialog.component";
import { useRecoilState } from "recoil";
import { TAlertData } from "../type/data.type";
import { stateAlertData } from "../component/atom.component";
import { IRespData } from "../type/http.interface";
import { http } from "../tools/http.tools";
import { IAPIData, INewsItem, IBookItem } from "../type/data.interface";
import { su } from "../tools/string.tools";
import moment from "moment";

const List = () => {
    const [tab, setTab] = useState<string>('01');
    const [alertData, showAlert] = useRecoilState<TAlertData>(stateAlertData);
    const [keyword, setKeyword] = useState<string>('');
    const [apiData, setApiData] = useState<IAPIData | null>(null);

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
        const data: string = 'type=' + (tab === '01' ? 'news' : 'book')
            + '&keyword=' + keyword;

        const resp: IRespData<IAPIData> = await http.doGet(url, data);

        if(resp.statusCode !== 200) {
            showAlert({
                show: true,
                title: '오류 알림',
                message: '뉴스 조회 시 살짝 오류가 발생했어요. 잠시 후에 다시 시도해주세요'
            });
            return;
        }
        setApiData(resp.data);
    };

    const NewRow = (item: INewsItem) => {
        const title: string = su.unescape(su.stripTag(item.title));
        const desc: string = su.unescape(su.stripTag(item.description));
        const pubDate: string = moment(item.pubDate).format('YYYY-MM-DD HH:mm');

        return <li className="newsRow">
            <span className="title ellipsis">{ title }</span>
            <span className="date">{ pubDate }</span>
            <span className="desc ellipsis">{ desc }</span>
        </li>
    };

    const BookRow = (item: IBookItem) => {
        const title: string = su.unescape(su.stripTag(item.title));
        const author: string = item.author;
        const desc: string = su.unescape(su.stripTag(item.description));
        const image: string = item.image;

        return <li className="bookRow">
            <div className="imageDiv">
                <img src={ image } alt={ title } />
            </div>
            <div className="infoDiv">
                <span className="title ellipsis">{ title }</span>
                <span className="author">{ author }</span>
                <span className="desc ellipsis">{ desc }</span>
            </div>
        </li>
    };

    useEffect(() => {
        keyword && callApi();
    }, [tab]);

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
                        apiData && apiData.items && apiData.items.length > 0 ?
                            apiData.items.map((item: INewsItem | IBookItem) => {
                                return apiData.type === 'news'
                                ? <NewRow { ...item as INewsItem } />
                                : <BookRow { ...item as IBookItem } />
                            })
                        :
                            <li className="nodata">
                                <span>
                                    { tab === '01' ? '조회한 뉴스가 없습니다.' : '조회한 도서가 없습니다.' }
                                </span>
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