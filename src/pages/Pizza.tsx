import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';

import { addItem } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const typeNames = ['Тонкое', 'Традиционное'];
const additions: Additions = [
  {
    id: 0,
    title: 'Пепперони',
    imageUrl: '/img/additionally/pepperoni.png',
    price: 100,
    active: false,
  },
  {
    id: 1,
    title: 'Брынза',
    imageUrl: '/img/additionally/brynza_cheese.png',
    price: 110,
    active: false,
  },
  {
    id: 2,
    title: 'Блю чиз',
    imageUrl: '/img/additionally/blue_cheese.png',
    price: 80,
    active: false,
  },
  {
    id: 3,
    title: 'Красный лук',
    imageUrl: '/img/additionally/onion.png',
    price: 90,
    active: false,
  },
  {
    id: 4,
    title: 'Ананасы',
    imageUrl: '/img/additionally/pineapple.png',
    price: 90,
    active: false,
  },
];

type Additions = {
  id: number | any;
  title: string;
  imageUrl: string;
  price: number;
  active: boolean;
}[];
type AdditionItem = {
  id: number | any;
  title: string;
  imageUrl: string;
  price: number;
  active: boolean;
};

const Pizza: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    sizes: number[];
    types: number[];
    title: string;
    imageUrl: string;
    price: number;
    id: string;
  }>();

  const [activeType, setType] = useState(0);
  const [activeSize, setSize] = useState(0);

  const [additionally, setAdditionally] = useState(additions);

  const [totalPricePizza, setTotalPricePizza] = useState(pizza ? pizza.price : 0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAdditions, setTotalPriceAdditions] = useState(0);

  // totalPrice - стоимость пиццы
  // totalPriceAdditions - стоимость дополнений к пицце
  // totalPricePizza - итоговая стоимость пиццы с дополнениями

  const cartItem = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id == id));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    if (pizza) {
      const item = {
        id: pizza.id,
        title: pizza.title,
        price: totalPricePizza,
        imageUrl: pizza.imageUrl,
        size: pizza.sizes[activeSize],
        type: typeNames[activeType],
      };

      dispatch(addItem(item));
    }
  };

  const onClickAdditionally = (obj: AdditionItem) => {
    // Переключить значение active у выбранного дополнения

    let currentEl = additions.find((el, i) => {
      console.log(el.id, obj.id);

      if (el.id == obj.id) {
        return true;
      }
    });

    setAdditionally(
      additionally.map((el) => {
        if (currentEl) {
          if (el.id == currentEl.id) {
            el.active = !el.active;
          }
        }
        return el;
      }),
    );

    // Сложить все дополнения у которых active = false (массив additions)

    let priceAdditions: number = 0;
    additionally.forEach((el) => {
      if (el.active) priceAdditions += el.price;
    });
    setTotalPriceAdditions(priceAdditions);

    if (pizza) {
      setTotalPricePizza(priceAdditions + pizza.price);
    }
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://632a40a7713d41bc8e6ccd58.mockapi.io/items/` + id);
        setPizza(data);

        setTotalPricePizza(data.price);
      } catch (error) {
        console.log('request failed');
        navigate('/404');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loader />;
  }

  return (
    <div className="pizza-info">
      <div className="pizza-info__column">
        <img className="pizza-info__image" src={pizza.imageUrl} alt={pizza.title} />
      </div>
      <div className="pizza-info__column pizza-info__column--options">
        <div className={totalPriceAdditions ? 'pizza-info__title active' : 'pizza-info__title'}>
          {pizza.title}
        </div>
        <div className="pizza-info__price">{totalPrice ? totalPrice : totalPricePizza} ₽</div>
        <div className="pizza-info__selector">
          <ul>
            {pizza.types.map((itemId) => (
              <li
                key={itemId}
                onClick={() => setType(itemId)}
                className={activeType == itemId ? 'active' : ''}>
                {typeNames[itemId]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => setSize(index)}
                className={activeSize == index ? 'active' : ''}>
                {item} см.
              </li>
            ))}
          </ul>
        </div>

        <div className="pizza-info__subtitle">Добавьте вкусностей</div>
        <div className="pizza-info__selector pizza-info__selector--additionally">
          <ul>
            {additionally.map((obj) => (
              <li
                className={obj.active ? 'active' : ''}
                key={obj.id}
                onClick={() => onClickAdditionally(obj)}>
                <img src={obj.imageUrl} />
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-info__bottom-buttons">
          <Link to="/" className="button button--outline button--add go-back-btn">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Вернуться назад</span>
          </Link>
          <button className="button button--outline button--add" onClick={() => onClickAdd()}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"></path>
            </svg>
            <span>Добавить в корзину</span>
            {addedCount ? <i>{addedCount}</i> : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
