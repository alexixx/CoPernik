import { FC, useState } from 'react';

const phrases = [
  'Just a second',
  'Looking for a suitable place',
  'Have you been to this city before?',
  'It seems it will be a uptown',
  'Just a minute more',
];

const Main: FC = () => {
  //   const [phrase, setPhrase] = useState('');
  //   let phraseIndex = 0;
  //   setInterval(() => {
  //     setPhrase(phrases[phraseIndex]);
  //     phraseIndex++;
  //   }, 3000);
  return (
    <>
      <div className="loader loader--main">Looking for a suitable place...</div>
    </>
  );
};

export default Main;
