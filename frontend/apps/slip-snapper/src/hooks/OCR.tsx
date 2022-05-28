import { IonText } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

/**
 * 
 * @param photo is a dataUrl which is passed into Tessaract worker 
 * @returns text produced by Tessaract
 */

export function ScanSlip(photo : string) {
  const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(photo);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });

  return (
    <IonText color='primary'>{ocr}</IonText> 
  );
}