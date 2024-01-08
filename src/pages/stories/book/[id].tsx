import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';

import BookPage from '@/modules/BibleStories/book/page';
import clsx from 'clsx';

import { Roboto_Serif } from 'next/font/google'
import styles from "./page.module.scss";

const colors = [
    "#f7f7f7", "#ddf8ff", "#f9ffdf", "#e0ffdf", "#dfeaff",
]

const Robot300 = Roboto_Serif({
    weight: '300',
    preload: false,
})

const Robot700 = Roboto_Serif({
    weight: '700',
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
        return story.script.map((script, index) => {
            const speakerName = getCharacterName(story, script.speaker);
            const backgroundColor = colors[script.speaker % colors.length]; // Cycle through colors

            return (
                <div
                    className={clsx(styles['paragraph-container'], styles['background'], styles[speakerName.toLowerCase()])}
                    key={index}
                    style={{ backgroundColor }}
                >
                    <p className={clsx(Robot700.className, styles['top'])}>{`${getCharacterName(story, script.speaker)} `}</p>
                    <p className={clsx(Robot700.className, styles['number'])}>{`#${index + 1} `}</p>
                    <p className={clsx(styles['text'])}>
                        {script.text}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className={clsx(Robot300.className, styles['main-container'])}>

            <div className={clsx(Robot700.className, styles['title-container'])}>
                <h2>{story.title}</h2>
                <p>{story.reference}</p>
            </div>

            <div style={{ position: "relative", height: "300px" }} className={clsx(styles['image-container'])}>
                <Image
                    className={styles.image}
                    src={'/storypics/01.jpg'}
                    layout="fill"
                    objectFit="contain"
                    alt='image'
                />
            </div>

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
