import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import imagePathFile from '../../../../character-parts.json';

export type PartsKind = keyof typeof imagePathFile;

interface Props {
  selectImage: (image: HTMLImageElement) => void;
  kind: PartsKind;
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

export const PickImages = ({ selectImage, kind }: Props) => {
  const [src, setSrc] = useState<string>();

  const select = useCallback(
    async (src: string) => {
      setSrc(src);
      const image = await loadImage(`/assets/parts/${kind}/${src}`);
      selectImage(image);
    },
    [kind, selectImage]
  );

  // 種類を切り替えた時に、その種類の一つ目の画像を選択する
  useEffect(() => {
    select(imagePathFile[kind][0]);
  }, [kind, select]);

  return (
    <ImageWrapper>
      {imagePathFile[kind].map((path) => (
        <button key={`${kind}/${path}`} onClick={() => select(path)}>
          <PartsImage src={`/assets/parts/${kind}/${path}`} alt="" data-selected={src === path} />
        </button>
      ))}
    </ImageWrapper>
  );
};
