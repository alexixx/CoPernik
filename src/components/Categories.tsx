import { useState, memo, FC } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  // useWhyDidYouUpdate('Categories', { value, onChangeCategory });
  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value == index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
