import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx';

import styles from "./page.module.scss";

import { useResponsive } from '@/hooks/responsive';

export default function Test() {

    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <div className={clsx(styles['main-container'])}>
            <div className={clsx(styles['title-section'])}>
                <h1 className={clsx(styles['text'])}>
                    Bible Stories
                </h1>
            </div>
        </div>
    );
}
