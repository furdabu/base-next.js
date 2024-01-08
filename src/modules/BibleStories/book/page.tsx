import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx';


import { useResponsive } from '@/hooks/responsive';

import { Lato } from 'next/font/google'
import styles from "./page.module.scss";

const Lato700 = Lato({
  weight: '400',
  preload: false,
})

export default function Test() {

    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <div className={clsx(styles['main-container'])}>
            <div className={clsx(styles['title-section'])}>
                <h1 className={clsx(Lato700.className , styles['text'])}>
                    Bible Stories
                </h1>
            </div>
        </div>
    );
}
