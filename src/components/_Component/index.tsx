import { useState, useRef, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import anime from 'animejs';
import { Link } from 'react-router-dom';

import { CartItemProps } from '../../redux/slices/pointsSlice';

const typeNames = ['Тонкое', 'Традиционное'];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: { cart: any }) =>
    state.cart.items.find((obj: { id: string }) => obj.id == id),
  );

  const currentPizza = useRef(null);

  title = title ? title : 'Пицца';
  let formattedPrice = price ? 'от ' + price + ' ₽' : 'Не указана';

  const [activeType, setType] = useState(0);
  const [activeSize, setSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    animationAddToBasket.current.play();
    const item: CartItemProps = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typeNames[activeType],
    };
  };

  // ANIMATION

  const animationRotate: any = useRef(null);
  const animationHighlite: any = useRef(null);
  const animationAddToBasket: any = useRef(null);
  const animationPizzaFire: any = useRef(null);

  const pizzaFire: any = useRef(null);

  useEffect(() => {
    animationRotate.current = anime({
      targets: currentPizza.current,
      rotate: {
        value: '+=2turn', // 0 + 2 = '2turn'
        duration: 1800,
        easing: 'easeInOutSine',
      },
      autoplay: false,
    });

    animationHighlite.current = anime({
      targets: currentPizza.current,
      scale: 1.09,
      autoplay: false,
    });

    animationAddToBasket.current = anime({
      targets: currentPizza.current,
      translateY: [
        { value: -12, delay: 0, easing: 'easeInOutCubic' },
        { value: 1, delay: 50, easing: 'easeInOutCubic' },
      ],
      easing: 'easeOutElastic(1, .8)',
      loop: false,
      autoplay: false,
      change: function (e) {
        // if (Math.round(e.progress) == 50) animationPizzaFire.current.play();
      },
    });

    // animationPizzaFire.current = anime({
    //   targets: pizzaFire.current,
    //   rotate: '1turn',
    //   opacity: 1,
    //   easing: 'easeOutElastic(1, .8)',
    //   loop: false,
    //   autoplay: false,
    //   complete: function (anim) {},
    // });
  });

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <div className="pizza-block__fire-wrapper">
          <svg
            ref={pizzaFire}
            className="pizza-block__fire"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 512 512"
            enableBackground="new 0 0 512 512">
            <path d="m371.156,111.07c-7.891-12.656-23.469-18.188-37.578-13.328-14.102,4.859-22.977,18.813-21.398,33.641 2.969,27.883-1.789,48.516-15.656,65.242-29.563-33.797-39.734-81.266-25.156-124.984 2.578-7.727 5.977-15.242 10.383-22.984 6.234-10.953 4.852-25.375-2.586-35.555-6.024-8.227-15.61-13.094-25.813-13.102-0.008,0-0.008,0-0.016,0-10.195,0-19.773,4.859-25.805,13.078-15.922,21.703-155.531,215.211-155.531,324.383 0,96.242 81.344,174.539 181.336,174.539 101.18,0 186.664-79.93 186.664-174.539 0-71.531-26.383-158.273-68.844-226.391zm-116.866,368.927c-52.859,0-95.719-34.18-95.719-76.359 0-45.28 65.93-128.114 88.354-154.98 2.168-2.597 6.99-1.235 6.919,1.931-0.274,12.249-0.018,33.315 3.709,53.406 3.686,19.877 10.77,38.799 24.094,47.285 21.196-12.284 30.563-27.965 31.355-47.264 0.133-3.224 5.234-4.412 7.079-1.579 22.143,34.013 33.347,72.368 33.347,101.201 0.001,42.179-46.277,76.359-99.138,76.359z" />
          </svg>
        </div>
        <Link
          to={'/pizza/' + id}
          ref={currentPizza}
          className="pizza-block__image"
          style={{ backgroundImage: `url(${imageUrl})` }}></Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((itemId) => (
              <li
                key={itemId}
                onClick={() => setType(itemId)}
                className={activeType == itemId ? 'active' : ''}>
                {typeNames[itemId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li
                key={index}
                onClick={() => setSize(index)}
                className={activeSize == index ? 'active' : ''}>
                {item} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{formattedPrice}</div>
          <button onClick={() => onClickAdd()} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount ? <i>{addedCount}</i> : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
