import { Ref, useRef } from 'react';
import ReactPlayer from 'react-player';
export default function Player(
    {url}:
    {url: string}
) {
    const playerRef = useRef<ReactPlayer>(null);
    const handleSeekTo = (timeInSeconds: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(timeInSeconds, 'seconds');
        }
    }
    return (
        <>
            <ReactPlayer 
                url={url} 
                ref={playerRef}

                />
            <button onClick={() => handleSeekTo(10)}>seek</button>
        </>
    )
}