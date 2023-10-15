import { TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PickColors } from '../element/PickColors';
import { PickImages } from '../element/PickImages';
import { NextButton } from '../element/NextButton';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoReturnDownBack } from 'react-icons/io5';

interface Props {
  next: (datauri: string) => Promise<void>;
}

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 18vw;
  height: 100svh;
`;

const CanvasOekaki = styled.canvas`
  width: 70%;
  border-radius: 20px;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
`;

const TabButton = styled.button`
  background-color: #fff;
  border-radius: 100vh;
  font-size: 4vw;
  padding: 2vw;
`;

const TabWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 4vw;
  position: fixed;
  bottom: 20vw;
  left: 0;
  padding: 0 10vw;
`;

const IconTrashWrapper = styled.div`
  position: fixed;
  left: 10px;
  top: 10px;
  border-radius: 50%;
  background-color: #ff0000;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #fff solid 2px;
`;

const IconBackWrapper = styled.div`
  position: fixed;
  left: 70px;
  top: 10px;
  border-radius: 50%;
  background-color: #ff0000;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #fff solid 2px;
`;

type Tab = 'color' | 'image';

const canvasHistory: string[] = [];

export const OekakiScene = ({ next }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [color, setColor] = useState<string>('#000000');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [tab, setTab] = useState<Tab>('color');

  useEffect(() => {
    const html = document.querySelector('html') as HTMLHtmlElement;
    const body = document.querySelector('body') as HTMLBodyElement;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    setCtx(ctx);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [ctx, canvasRef]);

  const getPosition = useCallback(
    (e: React.Touch) => {
      if (!canvasRef.current) return;
      const x =
        (canvasRef.current.width / canvasRef.current.clientWidth) *
        (e.clientX - canvasRef.current.getBoundingClientRect().left);
      const y =
        (canvasRef.current.height / canvasRef.current.clientHeight) *
        (e.clientY - canvasRef.current.getBoundingClientRect().top);
      return { x, y };
    },
    [canvasRef]
  );

  const drawStart = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      if (!ctx) return;
      ctx.beginPath();
      const touch = e.targetTouches[0];

      const { x, y } = getPosition(touch) as { x: number; y: number };

      ctx.moveTo(x, y);
    },
    [ctx, getPosition]
  );

  const drawMove = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      if (!ctx) return;
      const touch = e.targetTouches[0];

      const { x, y } = getPosition(touch) as { x: number; y: number };

      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.moveTo(x, y);
    },
    [ctx, getPosition]
  );

  const drawImage = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      if (!ctx || !image) return;
      const touch = e.targetTouches[0];

      const { x, y } = getPosition(touch) as { x: number; y: number };

      ctx.drawImage(image, x - image.width / 2, y - image.height / 2);
    },
    [image, ctx, getPosition]
  );

  const clearCanvas = useCallback(() => {
    if (!ctx || !canvasRef.current) return;
    const dataUrl = canvasRef.current?.toDataURL('image/jpeg') as string;
    canvasHistory.push(dataUrl);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, [ctx]);

  useEffect(() => {
    if (!ctx) return;
    ctx.strokeStyle = color;
  }, [color, ctx]);

  const touchStart = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      const dataUrl = canvasRef.current?.toDataURL('image/jpeg') as string;
      canvasHistory.push(dataUrl);
      if (tab === 'color') {
        drawStart(e);
      }
      if (tab === 'image') {
        drawImage(e);
      }
    },
    [tab, drawImage, drawStart]
  );

  const touchMove = useCallback(
    (e: TouchEvent<HTMLCanvasElement>) => {
      if (tab === 'color') {
        drawMove(e);
      }
    },
    [tab, drawMove]
  );

  const back = () => {
    if (!ctx || !canvasRef.current) return;
    const image = new Image();
    image.width = canvasRef.current.width;
    image.height = canvasRef.current.height;
    const src = canvasHistory.pop() as string;
    image.onload = () => {
      if (!ctx || !canvasRef.current) return;
      ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    image.src = src;
  };

  const finishDrawCharacter = useCallback(async () => {
    const dataUrl = canvasRef.current?.toDataURL('image/jpeg', 0.75) as string;
    await next(dataUrl);
  }, [next]);

  return (
    <CanvasWrapper>
      <NextButton onClick={finishDrawCharacter}>完成</NextButton>
      <IconTrashWrapper onClick={clearCanvas}>
        <BsFillTrashFill size="16px" color="#fff"></BsFillTrashFill>
      </IconTrashWrapper>
      <IconBackWrapper onClick={back}>
        <IoReturnDownBack size="16px" color="#fff" />
      </IconBackWrapper>
      <CanvasOekaki
        ref={canvasRef}
        width="1024"
        height="1433"
        onTouchStart={(e) => touchStart(e)}
        onTouchMove={(e) => touchMove(e)}
      ></CanvasOekaki>

      <TabWrapper>
        <TabButton onClick={() => setTab('color')}>筆の色</TabButton>
        <TabButton onClick={() => setTab('image')}>パーツ</TabButton>
      </TabWrapper>
      {tab === 'color' && <PickColors selectColor={setColor} />}
      {tab === 'image' && <PickImages selectImage={setImage} />}
    </CanvasWrapper>
  );
};
