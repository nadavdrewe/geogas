"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const mediaPath = (fileName: string) => {
  if (fileName.startsWith("http://") || fileName.startsWith("https://")) {
    return fileName;
  }

  if (fileName.startsWith("/")) {
    return fileName;
  }

  return `/video/${encodeURIComponent(fileName)}`;
};

const Blog = () => {
  const { content } = useSiteContent();
  const blogContent = content.home.blog;
  const videos = blogContent.videos;

  return (
    <div className="blog__two section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="blog__two-intro">
              <h2>{blogContent.title}</h2>
              <p>{blogContent.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {videos.map((video, index) => (
            <div
              key={video.file}
              className="col-xl-4 col-md-6 "
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <div className="blog__two-item blog__two-item--video topy-tilt">
                <div className="blog__two-item-image">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster={video.poster ? mediaPath(video.poster) : undefined}
                  >
                    <source src={mediaPath(video.file)} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                <div className="blog__two-item-content">
                  <h5>{video.title}</h5>
                  <p>{video.summary}</p>
                  <div className="meta">
                    <ul>
                      <li>
                        <a
                          href={mediaPath(video.file)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fas fa-video"></i>
                          {blogContent.watchLabel}
                        </a>
                      </li>
                      <li>
                        <Link href="/contact">
                          <i className="fas fa-calendar-check"></i>
                          {blogContent.bookingLabel}
                        </Link>
                      </li>
                    </ul>
                    <a href={mediaPath(video.file)} target="_blank" rel="noreferrer">
                      <i className="fa-regular fa-arrow-up-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
