import React, { useState, useCallback, useEffect, useRef } from "react";
import { SketchPicker, Color, ColorResult } from 'react-color';
import useMouse from '@react-hook/mouse-position'
import type { Order } from "../../models/order"
import { useGetColorMaster, useSetColorMaster } from "../../hooks/order"
import { BsFillCheckCircleFill } from "react-icons/bs";

type OrderListProps = {
    orders: Order[]
    onDelete: (id: Order["id"]) => void
    checkedIds: Order["id"][]
    setCheckIds: (ids: Order["id"][]) => void
}
function OrderList({orders, onDelete, checkedIds, setCheckIds}: OrderListProps): JSX.Element {
    const { status:getColorQueryStatus , data: colorMasterQueryData } = useGetColorMaster();
    const { mutate : setColorApi } = useSetColorMaster();
    const ref = useRef(null)
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100,
      })

    const [ pickerXY, setPickerXY ] = useState<{ x:number , y:number }>({ x:0, y:0 })
    const [ currentBgColor, setCurrentBgColor ] = useState<Color>('#fff')
    const [ currentItemCode, setCurrentItemCode ] = useState<string|null>(null)
    const [ visiblePicker, setVisiblePicker ] = useState<boolean>(false)
    const [ colorMaster, setColorMaster ] = useState<typeof colorMasterQueryData>(colorMasterQueryData)


    const handlePicker = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault()
            setPickerXY({
                x: mouse.x ?? 0,
                y: mouse.y ?? 0
            })
            setVisiblePicker(!visiblePicker)
            if( event.currentTarget.getAttribute('data-item-code')){
                setCurrentItemCode( event.currentTarget.getAttribute('data-item-code'))
            }
            return false
        },
        [mouse.x, mouse.y, visiblePicker],
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
                
                setColorApi(newMaster,{
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
        top: pickerXY.x,
        left: 0
      }

      const OrderRow = ({order}: { order: Order})  => {
        const [ visibleDeleteButton, setVisibleDeleteButton ] = useState<boolean>(false)

        return (
            <tr className={`table-row`}
                style={ { 
                    backgroundColor: colorMaster?.find((m) => m.item_code === order.item_code)?.color?.toString(),
                    position:"relative",
                    border: order.feces_type.includes("ヤマト")?"solid 2px #FD503E": "none", //「ヤマト」だけ強調表示
                }}
                key={`${order.reception_number}_${order.item_code}`}
                data-item-code={order.item_code}
                onContextMenu={handlePicker}
                onMouseEnter={() => setVisibleDeleteButton(true)}
                onMouseLeave={() => setVisibleDeleteButton(false)}
                onClick={() => setVisiblePicker(false)}
                >
                <td>
                {order.is_shipping_fixed ? <BsFillCheckCircleFill color="green"/>:
                    <input type="checkbox" onChange={(e) => {
                        if(e.target.checked){
                            setCheckIds([...checkedIds, order.id])
                        }else{
                            setCheckIds([...checkedIds.filter((id) => id !== order.id)])
                        }
                    }}
                    checked={checkedIds.indexOf(order.id) > -1}
                    />                
                }
                </td>
                <th scope="row">
                    {order.reception_number} 
                </th>
                <td>{order.item_code }
                </td>
                <td>{order.product_name}</td>
                <td>{order.feces_type}
                </td>
                <td>{order.quantity}</td>
                <td>{order.inclusive_sum?.toLocaleString()}
                {!order.is_shipping_fixed && visibleDeleteButton && 
                    <i
                    className="fa-solid fa-trash-can"
                    style={{color:"red", fontSize:"0.85em", display:"inline-block", fontWeight:"normal"}}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (confirm(`${order.reception_number}${order.product_name}\n削除してよろしいでしょうか。`)) {
                            onDelete(order.id)
                        }
                    }}
                    ></i>}  
                </td>
            </tr>)
        }
    

    return (
        <div className="table-responsive portlet order-list">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">
                        <input type="checkbox" onChange={(e) => {
                            if(e.target.checked){
                                setCheckIds(orders.map((o) => o.id))
                            }else{
                                setCheckIds([])
                            }
                        }}/>  
                        </th>
                        <th scope="col">受付番号</th>
                        <th scope="col">商品コード</th>
                        <th scope="col">商品名</th>
                        <th scope="col">数量</th>
                        <th scope="col">便種</th>
                        <th scope="col">合計金額</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => <OrderRow key={o.id} order={o}/>)}
                </tbody>
            </table>
            {visiblePicker && 
                <div style={ popover }>
                    <div>
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