import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx';

import styles from "./page.module.scss";

import { useResponsive } from '@/hooks/responsive';

export default function Test() {

    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <div className={clsx(styles['test-case'])}>
            <div className={ clsx(isDesktop && styles['test'])}>{(isDesktop) ? 'aaa' : 'bbb'}</div>
        </div>
    );
}
