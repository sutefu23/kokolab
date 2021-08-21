import React, { Fragment, useState, useCallback, useEffect } from "react";
import OrderList from "./OrderList";
import OrderGroup from "./OrderGroup";
import  "./Orders.css";
import TopCard from "../../common/components/TopCard";
import FileUploader from "../../common/components/FileUploder";
import useUpload from "../../hooks/order/useUploadCSV";
import useGetOrdersQuery from "../../hooks/order/useGetOrders";
import useGetGroupByItem from "../../hooks/order/useGetGroupByItem";

const Tabs = {
    ITEM_LIST: 'ITEM_LIST',
    ITEM_GROUP: 'ITEM_GROUP',
} as const

const Orders: React.FC = () => {
    const { status:orderStatus , data: orderData , error: orderErr } = useGetOrdersQuery();
    const { status:groupStatus , data: groupData , error: groupErr } = useGetGroupByItem();

    const { mutate } = useUpload();    

    const [ orders, setOrders ] = useState<typeof orderData>(orderData)
    const [ groups, setGroups ] = useState<typeof groupData>(groupData)

    const [ file, setFile ] = useState<File|null>(null);
    const [ tab, setTab ] = useState<typeof Tabs[keyof typeof Tabs]>(Tabs.ITEM_LIST)

    useEffect(() => {
        if (orderStatus === "success") {
            setOrders(orderData);
        }
    }, [orderStatus, orderData]);

    useEffect(() => {
        if (groupStatus === "success") {
            setGroups(groupData);
        }
    }, [groupStatus, groupData]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            if(!event.target.files) return;
            setFile(event.target.files[0]);
        },
        [],
    )
    const handleUpload = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if(!file) {
                alert("ファイルを選択してください。")
                return
            } 
            mutate(
                file,{
                    onError: (error) => {
                        alert(error.message);
                      },
                    onSuccess: (orders) => {
                        setOrders(orders);
                    },
                }
              );
        },
        [file, mutate]
    )
    const orderSum = useCallback(
        () => {
            return orders?.reduce<number>((acc: number, val) => {
                return acc + val.inclusive_sum
            },0)
        },
        [orders]
    )
    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">取引データ</h1>
            <p className="mb-4">こちらからアップロードしてください</p>
            <div className="row mb-4">
                <FileUploader 
                    id="csv_upload"
                    className="col"
                    inputClass="pb-2"
                    onFileChange={handleChange}
                    label="CSVアップロード"
                ></FileUploader>
                <button
                className={`btn btn-info btn-block col mt-4`}
                onClick={handleUpload}
                type="submit">
                アップロード
                </button>
            </div>

            <a href="/api/orders/download" className="btn btn-success mb-4" target="_blank">ダウンロード</a>

            <div className="row">
                {
                orders && 
                    <React.Fragment>
                        <TopCard title="受注日" text={orders[0].reception_date.toString()} icon="calendar-alt" class="success" />
                        <TopCard title="受注数" text={orders.length.toString()} icon="list-ol" class="danger" />
                        <TopCard title="合計額" text={orderSum()?.toLocaleString()??"0"} icon="calculator" class="success" />
                    </React.Fragment>
                }
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <ul className="nav nav-tabs">
                            <li className="card-header col-6 nav-item">
                                <a className={`btn m-0 font-weight-bold nav-link ${tab === Tabs.ITEM_LIST ? "active": 'text-green'}`} onClick={() => setTab(Tabs.ITEM_LIST)}>受注リスト</a>
                            </li>
                            <li className="card-header col-6 nav-item">
                                <a className={`btn m-0 font-weight-bold nav-link ${tab === Tabs.ITEM_GROUP ? "active": 'text-green'}`} onClick={() => setTab(Tabs.ITEM_GROUP)}>集計リスト</a>
                            </li>
                        </ul>
                        <div className="card-body">
                            {orders && tab == Tabs.ITEM_LIST &&
                                <OrderList orders={orders}/>
                            }
                            {groups && tab == Tabs.ITEM_GROUP &&
                                <OrderGroup groups={groups}/>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Orders;