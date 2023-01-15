import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import Skeleton from '../components/Skeleton';

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
    return (
      <div className="dependencies">
        {[...new Array(3)].map((item, index) => (
          <Skeleton key={index} name="simple-row" />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="content__top"></div>

      <div className="dependencies__list">
        {packagesData
          ? packagesData.map((item, index) =>
              item.homepage ? (
                <a key={index} href={item.homepage} target="_blank" className="dependencies__item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="dependencies-icon">
                    <path
                      d="M15.0004875,8 L18,8 C20.209139,8 22,9.790861 22,12 C22,14.209139 20.209139,16 18,16 L12,16 C9.790861,16 8,14.209139 8,12 C8,11.4477153 8.44771525,11 9,11 C9.55228475,11 10,11.4477153 10,12 C10,13.1045695 10.8954305,14 12,14 L18,14 C19.1045695,14 20,13.1045695 20,12 C20,10.8954305 19.1045695,10 18,10 L16.5839563,10 C16.2360594,9.20374889 15.6867759,8.51562167 15.0004875,8 Z M8.99951255,16 L6,16 C3.790861,16 2,14.209139 2,12 C2,9.790861 3.790861,8 6,8 L12,8 C14.209139,8 16,9.790861 16,12 C16,12.5522847 15.5522847,13 15,13 C14.4477153,13 14,12.5522847 14,12 C14,10.8954305 13.1045695,10 12,10 L6,10 C4.8954305,10 4,10.8954305 4,12 C4,13.1045695 4.8954305,14 6,14 L7.41604369,14 C7.7639406,14.7962511 8.3132241,15.4843783 8.99951255,16 Z"
                      transform="rotate(-45 12 12)"
                    />
                  </svg>
                  <div>{item.name}</div>
                </a>
              ) : (
                <div key={index} className="dependencies__item">
                  {item.name}
                </div>
              ),
            )
          : ''}
      </div>
      <a className="copyright" href="https://github.com/alexixx">
        by Alexixx
      </a>
    </>
  );
};

export default Home;
