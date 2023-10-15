import { useEffect, useState } from 'react';
import styled from 'styled-components';

const IMAGES_PATHS = [
  '00.png',
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '05.png',
  '06.png',
  '07.png',
  '08.png',
  '09.png',
  '10.png',
  '11.png',
  '12.png',
  '13.png',
  '14.png',
  '15.png',
  '16.png',
  '17.png',
  '18.png',
  '19.png',
  '20.png',
  '21.png',
  '22.png',
  '23.png',
  '24.png',
  '25.png',
  '26.png',
  '27.png',
  '28.png',
  '29.png',
  '30.png',
  '31.png',
  '32.png',
  '33.png',
  '34.png',
  '35.png',
  '36.png',
  '37.png',
  '38.png',
  '39.png',
  '40.png',
  '41.png',
  '42.png',
  '43.png',
  '44.png',
  '45.png',
  '46.png',
  '47.png',
];

interface Props {
  selectImage: (image: HTMLImageElement) => void;
}

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image not found'));

    image.src = src;
  });
};

const PartsImage = styled.img`
  height: 10vw;
  &[data-selected='true'] {
    background-color: #a5c7e6;
  }
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4vw;
  padding: 3vw;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: #eee;
`;

export const PickImages = ({ selectImage }: Props) => {
  const [src, setSrc] = useState<string>()

  useEffect(() => {
    (async () => {
      if (!src) return;
      const image = await loadImage(`/assets/parts/${src}`);
      selectImage(image);
    })()
  }, [src, selectImage])

  return (
    <ImageWrapper>
      {IMAGES_PATHS.map((path) => (
        <button key={path} onClick={() => setSrc(path)}>
          <PartsImage src={`/assets/parts/${path}`} alt="" data-selected={src === path} />
        </button>
      ))}
    </ImageWrapper>
  );
};
