import { FC } from 'react';

import Main from './Main';

type LoaderProps = {
  name: string;
};

const Loader: FC<LoaderProps> = (data) => {
  switch (data.name) {
    case 'main':
      return <Main />;
      break;

    default:
      return <Main />;
      break;
  }

  // return (
  //   <div className="skeleton-wrapper">
  //     <ContentLoader
  //       speed={2}
  //       width={280}
  //       height={480}
  //       className="skeleton skeleton--simple-row"
  //       viewBox="0 0 280 480"
  //       backgroundColor="#f3f3f3"
  //       foregroundColor="#ecebeb">
  //       <circle cx="138" cy="128" r="118" />
  //       <rect x="0" y="287" rx="5" ry="5" width="280" height="22" />
  //       <rect x="0" y="320" rx="5" ry="5" width="280" height="88" />
  //       <rect x="144" y="420" rx="0" ry="0" width="137" height="45" />
  //       <rect x="320" y="386" rx="0" ry="0" width="100" height="45" />
  //       <rect x="0" y="420" rx="0" ry="0" width="130" height="45" />
  //     </ContentLoader>
  //   </div>
  // );
};

export default Loader;
