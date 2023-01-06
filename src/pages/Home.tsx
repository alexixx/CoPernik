import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';

import packageList from '../../package.json';

type PackageItem = {
  name: string;
  homepage?: string;
}[];

export const Home: FC = () => {
  const [packagesData, setPackagesData] = useState<PackageItem>();
  const [status, setStatus] = useState('pending');

  const packageListFormatter = async () => {
    let arr: PackageItem = [];

    for (let key in packageList.dependencies) {
      if (!/^@(.*)[\/]/.test(key)) {
        await axios
          .get(`https://api.npms.io/v2/package/${key}`)
          .then(function (response) {
            arr.push({
              name: key,
              homepage: response.data.collected.github.homepage,
            });
          })
          .catch(function (error) {
            arr.push({
              name: key,
            });
          });
      }
    }
    console.log(arr);

    setPackagesData(arr);
    setStatus('success');
  };

  useEffect(() => {
    packageListFormatter();
  }, []);

  if (!packagesData) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="content__top"></div>
      <h2 className="content__title">react-template</h2>
      <h3 className="content__subtitle">contains:</h3>
      <div className="dependencies__list">
        {status == 'pending' ? (
          <div>Загрузка</div>
        ) : (
          packagesData.map((item, index) => (
            <a key={index} href={item.homepage} target="_blank" className="dependencies__item">
              {item.name}
            </a>
          ))
        )}
      </div>
      <a className="copyright" href="https://github.com/alexixx">
        by Alexixx
      </a>
    </>
  );
};

export default Home;
