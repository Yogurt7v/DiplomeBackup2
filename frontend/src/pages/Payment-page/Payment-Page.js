import style from "./payment-page.module.css";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header, Delivery } from "../components";
import {
  getOrderByUserIdFetch,
  setBusketOrdersParams,
} from "../../fetchs";
import axios from "axios";

export const PaymentPage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState(null);
  const [delivery, setDelivery] = useState(false);
  const [singleOrder, setSingleOrder] = useState(null);
  const navigate = useNavigate();
  let count = 1;

  const singleOrderFuction = (id) => {
    return orders?.filter((order) => order._id === id);
  };

  const getCheckedOrders = (id) => {
    setDelivery(!delivery);
    setSingleOrder(singleOrderFuction(id));
    setBusketOrdersParams(id, true, false);
    setTimeout(() => {
      setBusketOrdersParams(id, true, true);
      setDelivery(!delivery);
    }, 21000);
  };

  const deleteOrder = (id) => {
    axios.delete(`/buskets/${id}`);
    setOrders(orders?.filter((order) => order._id !== id));
  };

  useLayoutEffect(() => {
    getOrderByUserIdFetch(user.id).then((newData) => {
      setOrders(newData);
    });
}, [user.id]);



  return (
    <>
      <Header />
      <div className={style.PaymentPage}>

        {orders?.filter((order) => order.paid === false)
          .map((order) => (
            <>
              {!delivery && (
                <div className={style.Order}>
                  <div>Ваш заказ № {count++}</div>
                  <div>
                    от {order.createdAt.split("T")[0]}{" "}
                    {order.createdAt.split("T")[1].split(".")[0]}
                  </div>
                  <div className={style.OrderDetails}>
                    {order.items?.map((item) => (
                      <>
                        <div>
                          <div key={order.id}>
                            <label className={style.ItemDetails} f>
                              <div>{item.productName}</div>
                              <div>{item.quantity} шт.</div>
                              <div>{item.price} $</div>
                            </label>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <button
                    className={style.OrderButton}
                    onClick={() => getCheckedOrders(order._id)}
                  >
                    Оплатить
                  </button>
                  <button
                    className={style.DeleteButton}
                    onClick={() => deleteOrder(order._id)}
                  >
                    Удалить
                  </button>
                  <div>Представим, что здесь будет процесс оплаты.</div>
                </div>
              )}
            </>
          ))}
                  <button
          className={
           delivery ? style.invisibleButton : style.DeleteButton
          }
          onClick={() => navigate("/")}
        >
          Назад
        </button>
        <div className={style.delyveryWrapper}>
          {delivery ? <Delivery singleOrder={singleOrder} /> : null}
        </div>
      </div>
    </>
  );
};
