import React, { useState, useCallback, useEffect } from "react";
import { SketchPicker, Color, ColorResult } from 'react-color';
import { Order, OrderColorMaster } from "../../models/order"
import { useGetColorMaster, useSetColorMaster } from "../../hooks/order"

type OrderListProps = {
    orders: Order[]
}
function OrderList(props: OrderListProps): JSX.Element {
    const { status:getColorQueryStatus , data: colorMasterQueryData } = useGetColorMaster();
    const { mutate } = useSetColorMaster();

    const [ currentBgColor, setCurrentBgColor ] = useState<Color>('#fff')
    const [ currentItemCode, setCurrentItemCode ] = useState<string|null>(null)
    const [ visiblePicker, setVisiblePicker ] = useState<boolean>(false)
    const [ colorMaster, setColorMaster ] = useState<typeof colorMasterQueryData>(colorMasterQueryData)

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault()
            setVisiblePicker(!visiblePicker)
            if( event.currentTarget.getAttribute('data-item-code')){
                setCurrentItemCode( event.currentTarget.getAttribute('data-item-code'))
            }
        },
        [visiblePicker],
    )

    useEffect(() => {
        if (getColorQueryStatus === "success") {
            setColorMaster(colorMasterQueryData);
        }
    }, [getColorQueryStatus, colorMasterQueryData]);

    const handleChangeComplete = 
        (color: ColorResult) => {
            setCurrentBgColor(color.hex)
            if(colorMaster && currentItemCode){
                const newElm = {item_code: currentItemCode ,color: color.hex }
                const newMaster = [...colorMaster.filter((m) => m.item_code !== currentItemCode), newElm ]
                
                mutate(newMaster,{
                    onError: (error) => {
                        alert(error.message);
                      },
                    onSuccess: (retMaster) => {
                        setColorMaster(retMaster)
                    },
                })    
            }
        }
    const popover = {
        position: 'absolute' as const,
        zIndex: 2,
        top:0,
        left:'-10px'
      }
    const cover = {
    }

    const orderList: JSX.Element[] = props.orders.map((order) => {
        return (
            <tr className={`table-row`}
                style={ { backgroundColor: colorMaster?.find((m) => m.item_code === order.item_code)?.color?.toString() }}
                key={`${order.reception_number}_${order.item_code}`}
                data-item-code={order.item_code}
                onClick={handleClick}
                >
                <th scope="row">{order.reception_number}</th>
                <td>{order.item_code }
                </td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.inclusive_sum}</td>
            </tr>);
    })

    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">受付番号</th>
                        <th scope="col">商品コード</th>
                        <th scope="col">商品名</th>
                        <th scope="col">数量</th>
                        <th scope="col">合計金額</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
            {visiblePicker && 
                <div style={ popover }>
                    <div style={ cover }>
                        <SketchPicker
                            color={ currentBgColor }
                            onChangeComplete={ handleChangeComplete }
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderList;