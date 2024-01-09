import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'
import BookPage from '@/modules/BibleStories/book/page';
import clsx from 'clsx';

import { Roboto_Serif } from 'next/font/google'
import styles from "./page.module.scss";
import { Howl } from 'howler'


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
    startat: string;
    endat: string;
    title: string;
    text: string;
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


    const [playing, setPlaying] = useState(false);
    const [seek, setSeek] = useState(0.5);
    const [sound, setSound] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentLine, setCurrentLine] = useState(-1);

    const [lineCount, setlineCount] = useState(0);

    const timelist = story.script.map(element => {
        return (
            {
                "start": element.startat,
                "end": element.endat
            }
        )
    })


    const timelistSub = story.subinfo.map(element => {
        return (
            {
                "start": element.startat,
                "end": element.endat
            }
        )
    })


    useEffect(() => {
        const initializeSound = () => {
            setSound(
                new Howl({
                    src: ['/audio/01.mp3'],
                    format: ['mp3'],
                    onend: () => {
                        setPlaying(false);
                    },
                })
            );
        };

        initializeSound();
        updateCurrentTime();

        const lines = story.script.length;
        setlineCount(lines);

        return () => {
            if (sound) {
                sound.unload();
            }
        };

    }, []);



    //現在の再生位置を決める
    useEffect(() => {
        timelist.map((el, index) => {
            if (parseFloat(el.start) < currentTime && currentTime < parseFloat(el.end)) {
                return setCurrentLine(index);
            }
        })

        timelistSub.map((el, index) => {
            if (parseFloat(el.start) < currentTime && currentTime < parseFloat(el.end)) {
                return setCurrentLine(index + lineCount);
            }
        })


    }, [currentTime]);

    useEffect(() => {
        if (sound) {
            sound.seek(seek);
        }

    }, [seek]);

    // const handlePlay = () => {
    //     updateCurrentTime();
    //     if (playing) {
    //         if (sound) {
    //             sound.pause();
    //         }
    //     } else {
    //         if (sound) {
    //             sound.play();

    //         }
    //     }
    //     setPlaying(!playing);

    // };

    const handlePause = () => {
        setPlaying(false);

    };

    const updateCurrentTime = () => {
        if (sound) {
            setCurrentTime(sound.seek() * 1000);
            requestAnimationFrame(updateCurrentTime); // Request the next animation frame
        }
    };

    const setPos = (seekPos) => {
        updateCurrentTime();
        if (playing) {
            if (sound) {
                setSeek(seekPos);
            }
        } else {
            if (sound) {
                sound.play();
                setPlaying(!playing);

            }
        }





        if (seekPos !== -1) setSeek(seekPos);
    };

    const getCharacterName = (story: StoryData, speakerID: number): string => {
        const character = story.characters.find((char) => char.id === speakerID);
        return character ? character.name : 'Unknown Character';
    };

    const generateCharacterList = (characters: Character[]) => {
        return characters.map((character, index) => (
            <div key={index}>
                <p>{character.name}</p>
                <p>{`Character ID: ${character.id}`}</p>
            </div>
        ));
    };


    const generateParagraphs = (script: Script[]) => {
        return script.map((script, index) => {
            const speakerName = getCharacterName(story, script.speaker);
            const backgroundColor = colors[script.speaker % colors.length]; // Cycle through colors

            return (
                <div
                    className={clsx(index === currentLine && styles['highlighted'], styles['paragraph-container'], styles['background'], styles[speakerName.toLowerCase()])}
                    key={index}
                    style={{ backgroundColor }}
                    onClick={() => {
                        setPos(parseInt(script.startat) / 1000);
                    }}
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

    const generateSubinfo = (script: Subinfo[]) => {
        return script.map((script, index) => {
            return (
                <div
                    className={clsx(index === currentLine - lineCount && styles['highlighted'], styles['paragraph-container'], styles['background'])}
                    key={index}
                    onClick={() => {
                        setPos(parseInt(script.startat) / 1000);
                    }}
                >
                    <p className={clsx(Robot700.className, styles['top'])}> {(script.title)} </p>
                    <p className={clsx(Robot700.className, styles['number'])}>{`#${index + lineCount + 1} `}</p>
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

                <div className={clsx(styles['characer-list'])}>
                    {generateCharacterList(story.characters)}
                </div>
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

            <div className={clsx(styles['subinfo-container'])}>
                <h3 className={clsx(styles['title'])}>
                    Quotes
                </h3>
                {generateSubinfo(story.subinfo)}
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
