import React from 'react';

export default function VideoEmbed({ video, isVertical = false }) {
  const aspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";
  
  if (video.type === 'youtube') {
    const videoId = video.url.split('v=')[1]?.split('&')[0] || video.url.split('/').pop();
    return (
      <div className={`${aspectClass} w-full rounded-lg overflow-hidden`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title || "Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  if (video.type === 'vimeo') {
    const videoId = video.url.split('/').pop();
    return (
      <div className={`${aspectClass} w-full rounded-lg overflow-hidden`}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={video.title || "Video"}
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  if (video.type === 'mp4') {
    return (
      <div className={`${aspectClass} w-full rounded-lg overflow-hidden bg-black`}>
        <video
          controls
          poster={video.poster}
          className="w-full h-full object-contain"
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return null;
}