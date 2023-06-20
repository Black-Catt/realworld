import { FC } from 'react';
import Container from './Container';

interface BannerProps {}

const Banner: FC<BannerProps> = ({}) => {
  return (
    <div className="bg-realworld-green text-white p-8 mb-8">
      <Container>
        <h1 className="font-montserrat text-center text-logo  pb-2">
          RealWorld
        </h1>
        <p className=" text-center text-xl font-light">
          Explore the vast and exciting galaxy of blogs
        </p>
      </Container>
    </div>
  );
};

export default Banner;
