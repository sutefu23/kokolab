import React, { Fragment } from "react";
import TopCard from "../../common/components/TopCard";
import OrderList from "../Orders/OrderList";

const Home: React.FC = () => {

  // const orders: IOrder[] = useSelector((state: IStateType) => state.orders.orders);
  // const totalSales: number = orders.reduce((prev, next) => prev + next.totalPrice, 0);
  // const totalOrderAmount: number = orders.reduce((prev, next) => prev + next.amount, 0);


  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        {/* <TopCard title="PRODUCT COUNT" text={`${numberItemsCount}`} icon="box" class="primary" />
        <TopCard title="PRODUCT AMOUNT" text={`${totalProductAmount}`} icon="warehouse" class="danger" />
        <TopCard title="SUMMARY PRICE" text={`$${totalPrice}`} icon="dollar-sign" class="success" /> */}
      </div>

      <div className="row">
        {/* <TopCard title="SALES" text={totalSales.toString()} icon="donate" class="primary" />
        <TopCard title="ORDER AMOUNT" text={totalOrderAmount.toString()} icon="calculator" class="danger" /> */}
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">受注リスト</h6>
            </div>
            <div className="card-body">
              {/* <OrderList /> */}
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;
