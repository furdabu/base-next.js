import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';

import BookPage from '@/modules/BibleStories/book/page';
import clsx from 'clsx';

import { Roboto_Serif } from 'next/font/google'
import styles from "./page.module.scss";

const Robot400 = Roboto_Serif({
    weight: '300',
    preload: false,
})



interface Character {
    name: string;
    id: number;
}

interface Script {
    startat: string;
    endat: string;
    speaker: number;
    text: string;
}

interface Subinfo {
    title: string;
    content: string;
}

interface StoryData {
    title: string;
    reference: string;
    characters: Character[];
    script: Script[];
    subinfo: Subinfo[];
}

interface pramProps {

}



type StoryList = StoryData[];

export default function Book({ story }: { story: StoryData }) {

    const getCharacterName = (story: StoryData, speakerID: number): string => {
        const character = story.characters.find((char) => char.id === speakerID);
        return character ? character.name : 'Unknown Character';
    };

    const generateParagraphs = (script: Script[]) => {
        return story.script.map((script, index) => (
            <div className={clsx(styles['paragraph-container'])} key={index}>
                <p>{`#${index + 1} - ${getCharacterName(story, script.speaker)}: `}</p>
                {script.text}
            </div>
        ));
    };

    return (
        <div className={clsx(Robot400.className, styles['main-container'])}>
            <h2>{story.title}</h2>

            <div className={clsx(styles['book-container'])}>
                {generateParagraphs(story.script)}
            </div>
        </div>
    )
}

export async function getStaticProps(context: { params: any; }) {

    const { params } = context
    const response = await fetch(process.env.BASEURL + '/api/book');
    const data: StoryList = await response.json();


    const intID = parseInt(params.id, 10);

    const story: StoryData = data[intID];
    return {
        props: {
            story
        },
    }
}



export async function getStaticPaths() {


    const response = await fetch(process.env.BASEURL + '/api/book');
    const data: StoryList = await response.json();

    const paths = data.map((story, index) => {
        return {
            params: { id: `${index}` }
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}
