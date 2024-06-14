import React, { useState, ChangeEvent } from 'react';

const VideoUpload: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setSelectedVideo(null);
            setVideoPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedVideo) {
            alert('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedVideo);

        try {
            const response = await fetch('YOUR_SERVER_UPLOAD_ENDPOINT', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload video');
            }

            alert('Video uploaded successfully');
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error uploading video');
        }
    };

    return (
            <input className="w-[300px] cursor-pointer" type="file" accept="video/*" onChange={handleVideoChange} />
    );
};

export default VideoUpload;
