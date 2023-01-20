import React, { useEffect, useState } from 'react';
import { Panorama, YMaps } from 'react-yandex-maps';

const BigPanorama = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <></>
    // <YMaps key="panorama" query={{ lang: 'en_RU', apikey: 'c2b47d53-207f-4593-9c59-b6e18207f6c2' }}>
    //   <div className="panorama-main">
    //     <Panorama
    //       point={[56.157504, 40.46053]}
    //       options={{ controls: [''] }}
    //       width={'100%'}
    //       height={'100%'}
    //     />
    //   </div>
    // </YMaps>
  );
};

export default BigPanorama;
