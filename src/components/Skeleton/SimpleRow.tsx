import { FC } from 'react';
import ContentLoader from 'react-content-loader';

// SIMPLE-ROW

const Skeleton: FC = () => (
  <div className="skeleton-wrapper">
    <ContentLoader
      speed={1}
      width={280}
      height={30}
      className="skeleton skeleton--simple-row"
      viewBox="0 0 280 30"
      backgroundColor="#141313"
      foregroundColor="#6e6e6e"
      backgroundOpacity={0.3}>
      <rect x="0" y="0" rx="5" ry="5" width="280" height="17" />
    </ContentLoader>
  </div>
);

export default Skeleton;
