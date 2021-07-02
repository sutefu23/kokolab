import React, { Fragment, useState, useCallback, useEffect } from "react";
import OrderList from "./OrderList";
import TopCard from "../../common/components/TopCard";
import FileUploader from "../../common/components/FileUploder";
import useUpload from "../../hooks/order/useUploadCSV";
import useGetOrdersQuery from "../../hooks/order/useGetOrders";

const Orders: React.FC = () => {
    const { status:orderStatus , data: orderData , error: orderErr } = useGetOrdersQuery();
    const { mutate } = useUpload();
    

    const [ orders, setOrders ] = useState<typeof orderData>(orderData)
    const [ file, setFile ] = useState<File|null>(null);

    useEffect(() => {
        if (orderStatus === "success") {
            setOrders(orderData);
        }
    }, [orderStatus, orderData]);

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
            if(!file) return ;
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
    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">取引データ</h1>
            <p className="mb-4">こちらからアップロードしてください</p>
            <FileUploader 
                id="csv_upload"
                onFileChange={handleChange}
                label="CSVアップロード"
            ></FileUploader>
            <button
            className={`btn btn-primary btn-user btn-block`}
            onClick={handleUpload}
            type="submit">
            アップロード
            </button>
            <div className="row">
                {
                orders && 
                    <TopCard title="TOTAL AMOUNT" text={orders.length.toString()} icon="calculator" class="danger" />
                }
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
                            {orders &&
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