'use server';
import { getMetadata } from "video-metadata-thumbnails"
export default async function VideoData({file}: {file: File}) {
    const metadata = await getMetadata(file);
    return (
        <p>
            {metadata.duration}
        </p>
    )
}