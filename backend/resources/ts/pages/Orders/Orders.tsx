import React, { Fragment, useState, useCallback, useEffect } from "react";
import OrderList from "./OrderList";
import TopCard from "../../common/components/TopCard";
import FileUploader from "../../common/components/FileUploder";
import useUpload from "../../hooks/order/useUploadCSV";
import useGetOrdersQuery from "../../hooks/order/useGetOrders";
import { Order } from "../../models/order";

const Orders: React.FC = () => {
    const uploadResults = useUpload();
    const queryOrderResults = useGetOrdersQuery();
    

    const [ orders, setOrders ] = useState(queryOrderResults.data || [])
    const handleUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
        },
        [orders],
    )
        
    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">取引データ</h1>
            <p className="mb-4">こちらからアップロードしてください</p>
            <FileUploader 
                id="csv_upload"
                onFileChange={handleUpload}
                label="CSVアップロード"
            ></FileUploader>
            <div className="row">
                <TopCard title="TOTAL AMOUNT" text={orders.length.toString()} icon="calculator" class="danger" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Order List</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            {orders??
                                <OrderList orders={orders}/>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default Orders;