import React, { Fragment, useState, useCallback, useEffect } from "react";
import OrderList from "./OrderList";
import OrderGroup from "./OrderGroup";
import  "./Orders.css";
import TopCard from "../../common/components/TopCard";
import FileUploader from "../../common/components/FileUploder";
import Notification from "../../common/components/Notification";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs"
import {useUploadCSV, useGetOrdersQuery, useGetGroupByItem, useDeleteOrder, useSettleShipping} from "../../hooks/order";
import type { Order } from "../../models/order"


const Tabs = {
    ITEM_LIST: 'ITEM_LIST',
    ITEM_GROUP: 'ITEM_GROUP',
} as const

const Orders: React.FC = () => {
    const [ queryDate, setQueryDate ] = useState<Order["delivery_due_date"]>(new Date());

    const { status:orderStatus , data: orderData , error: orderErr } = useGetOrdersQuery({fromDate: queryDate, toDate: queryDate});
    const { status:groupStatus , data: groupData , error: groupErr } = useGetGroupByItem({fromDate: queryDate, toDate: queryDate});
    const { mutate : deleteOrderApi } = useDeleteOrder();
    const { mutate : settleShippingApi } = useSettleShipping();

    const { mutate } = useUploadCSV();
    const [ displayAlert, setDisplayAlert ] = useState<boolean>(false)

    const [ orders, setOrders ] = useState<typeof orderData>(orderData)
    const [ groups, setGroups ] = useState<typeof groupData>(groupData)

    const [ file, setFile ] = useState<File|null>(null);
    const [ tab, setTab ] = useState<typeof Tabs[keyof typeof Tabs]>(Tabs.ITEM_LIST)

    const [ selectedIds, setSelectedIds ] = useState<Order["id"][]>([])


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

    const deleteOrders = useCallback((ids: Order["id"][]) => {
        deleteOrderApi({ids, target_date: queryDate}, {
            onError: (error) => {
                alert(error.message);
                },
            onSuccess: (items) => {
                setOrders(items)
            },
        })
    }, [deleteOrderApi, queryDate])

    const settleShipping = useCallback(() => {
        const ids = orders?.map((o) => o.id)
        if(ids && ids?.length > 0 ){
            settleShippingApi({ids, target_date: queryDate}, {
                onError: (error) => {
                    alert(error.message);
                    },
                onSuccess: (items) => {
                    setOrders(items)
                },
            })    
        }
    }, [orders, settleShippingApi, queryDate])

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
                {
                    csv: file,
                    target_date: queryDate
                },{
                    onError: (error) => {
                        alert(error.message);
                      },
                    onSuccess: (orders) => {
                        setOrders(orders)
                        setFile(null)
                        setDisplayAlert(true)
                    },
                }
              );
        },
        [file, queryDate, mutate]
    )
    
    const orderSum = useCallback(
        () => {
            return orders?.reduce<number>((acc: number, val) => {
                return acc + val.inclusive_sum
            },0) ?? 0
        },
        [orders]
    )
    const orderCount = useCallback(
        () => {
            return orders?.reduce<Array<string>>((keys: Array<string>, order) => {
                if (!keys.find((k) => k === order.reception_number)){
                    keys.push(order.reception_number)
                }
                return keys
            },[]).length ?? 0
        },
        [orders]
    )


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">取引データ </h1>
            <p className="mb-4">こちらからアップロードしてください</p>
            <Notification title="アップロードしました。" text="明細をアップロードしました。" isShow={displayAlert}></Notification>
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

            <div className="row">
                {
                orders &&
                    <React.Fragment>
                        <TopCard title="発送予定" text="" icon="" class="success">
                        <input type="date" name="date" defaultValue={String(new Date())}
                            onChange={(e) => {e.currentTarget.value}}
                        />
                        </TopCard>
                        <TopCard title="受注数" text={orderCount().toString()} icon="list-ol" class="danger" />
                        <TopCard title="合計額" text={orderSum().toLocaleString()} icon="calculator" class="success" />
                    </React.Fragment>
                }
            </div>
            <div className="row">
                <div
                className="col-4 btn font-weight-bold nav-link text-green"
                style={{"textAlign":"left"}}
                onClick={() => {
                    const prevDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() - 1)
                    setQueryDate(prevDate)
                }}
                >
                    <BsFillCaretLeftFill/>前日
                </div>
                <div className="col-4">
                </div>
                <div className="col-4 btn font-weight-bold nav-link text-green" style={{"textAlign":"right"}}
                    onClick={() => {
                        const nextDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate() + 1)
                        setQueryDate(nextDate)
                    }}
                >
                    翌日
                    <BsFillCaretRightFill/>
                </div>
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
                                <OrderList 
                                orders={orders}
                                onDelete={(id) => deleteOrders([id])}
                                checkedIds={selectedIds}
                                setCheckIds={setSelectedIds}
                                />
                            }
                            {groups && tab == Tabs.ITEM_GROUP &&
                                <OrderGroup groups={groups}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
           {orderErr && 
                <Notification title="エラー" text="商品情報の取得に失敗しました。" isShow={true}/>
           }
           {groupErr && 
                <Notification title="エラー" text="商品グループデータの取得に失敗しました。" isShow={true} />
           }

            {orders &&
            <React.Fragment>
                <div className="btn btn-danger mb-4"
                    onClick={(e) => {
                        e.preventDefault()
                        if(selectedIds.length == 0){
                            alert("明細が選択されていません")
                            return
                        }
                        const deleteIds = orders.filter((o) => selectedIds.indexOf(o.id) > 1 && !o.is_shipping_fixed).map((o) => o.id)
                        if(confirm(`${deleteIds.length}件を削除します\n（確定明細は削除されません）`)){
                            deleteOrders(deleteIds)
                        }
                    }}
                >出荷削除</div>
                <div className="btn btn-info mb-4 ml-4"
                    onClick={(e) => {
                        e.preventDefault()
                        if(confirm(`表示されている${orderCount().toString()}件の出荷を確定します`)){
                            settleShipping()
                        }
                    }}
                >出荷確定</div>
                <a href={`/api/orders/download/pickingList/?targetDate=${queryDate.toISOString()}`} rel="noreferrer" className="btn btn-success mb-4 ml-4" target="_blank">ピッキングリスト</a>
                <a href={`/api/orders/download/invoice?targetDate=${queryDate.toISOString()}`} rel="noreferrer" className="btn btn-success ml-4 mb-4" target="_blank">納品書</a>
            </React.Fragment>
            }
        </Fragment>
    )
}

export default Orders;
