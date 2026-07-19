"use client";
import { useState } from "react";

const VideoModal = () => {
  const [video, setVideo] = useState(true);

  return (
    <div className={"vid-m" + (video ? " vid-a" : " ")}>
      <div className="vid-c">
        <button
          aria-label="close video popup"
          className="close-v"
          onClick={() => setVideo(false)}
        >
          <i className="fa-light fa-xmark-large"></i>
        </button>
        <video autoPlay loop muted controls>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <h5>Hello</h5>
      </div>
    </div>
  );
};

export default VideoModal;
