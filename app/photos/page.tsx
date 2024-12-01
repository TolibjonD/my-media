"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

type MediaItem = {
    id: string;
    baseUrl: string;
    filename: string;
    mimeType: string; // Determines whether it's an image or video
};

const PhotosPage = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/photos')
            .then((res) => res.json())
            .then((data) => {
                setMediaItems(data);
                setLoading(false);
            });
    }, []);

    const photos = mediaItems.filter((item) => item.mimeType.startsWith('image/'));
    const videos = mediaItems.filter((item) => item.mimeType.startsWith('video/'));

    if (loading) {
        return <div className="text-center mt-10 text-gray-700">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Google Media</h1>

            {/* Photos Section */}
            <section className="mb-8">
                <div className="flex items-center mb-4">
                    <PhotoIcon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-semibold ml-2">Photos</h2>
                </div>
                {photos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo) => (
                            <div key={photo.id} className="relative">
                                <Image
                                    src={photo.baseUrl}
                                    alt={photo.filename}
                                    width={300}
                                    height={300}
                                    className="rounded shadow hover:scale-105 transition-transform object-cover"
                                />
                                <p className="text-sm text-gray-600 mt-1">{photo.filename}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No photos found.</p>
                )}
            </section>

            {/* Videos Section */}
            <section>
                <div className="flex items-center mb-4">
                    <VideoCameraIcon className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-semibold ml-2">Videos</h2>
                </div>
                {videos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {videos.map((video) => (
                            <div key={video.id} className="relative">
                                <video
                                    controls
                                    className="rounded shadow hover:scale-105 transition-transform object-cover"
                                >
                                    <source src={video.baseUrl} type={video.mimeType} />
                                </video>
                                <p className="text-sm text-gray-600 mt-1">{video.filename}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No videos found.</p>
                )}
            </section>
        </div>
    );
};

export default PhotosPage;
