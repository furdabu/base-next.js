import Head from 'next/head'
import Image from 'next/image'

import { useResponsive } from '@/hooks/responsive';

export default function Test() {

    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <div className=""> { (isDesktop) ? 'aaa' : 'bbb'} </div>
    );
}
