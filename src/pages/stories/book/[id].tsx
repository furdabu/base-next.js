import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';

import BookPage from '@/modules/BibleStories/book/page';

export default function Home() {

  return (
    <div className="">
      <BookPage></BookPage>
    </div>
  );
}
