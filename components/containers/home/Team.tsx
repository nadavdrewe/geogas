"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const getHeroImagePath = (
  normalImagePath: string,
  explicitHeroImagePath?: string
): string => {
  if (explicitHeroImagePath) {
    return explicitHeroImagePath;
  }
  if (normalImagePath.includes("_normal.")) {
    return normalImagePath.replace("_normal.", "_hero.");
  }
  return normalImagePath;
};

const Team = () => {
  const { content } = useSiteContent();
  const teamContent = content.home.team;
  const staffProfiles = teamContent.members;

  return (
    <div className="team__two section-padding" id="home-team">
      <div className="container">
        <div className="row mb-40 ai-end">
          <div className="col-xl-8">
            <div className="team__two-title">
              <h2>{teamContent.title}</h2>
              <p>{teamContent.description}</p>
            </div>
          </div>
          <div className="col-xl-4 t-right xl-t-left xl-mt-20">
            <Link className="button-1" href={teamContent.primaryAction.href}>
              {teamContent.primaryAction.label}
              <i className="fa-regular fa-angle-right"></i>
            </Link>
          </div>
        </div>
        <p className="team__two-profiles-note">
          <strong>{teamContent.profilesTitle}:</strong> {teamContent.profilesDescription}
        </p>
        <div className="row">
          {staffProfiles.map((member, index) => {
            const heroImagePath = getHeroImagePath(
              member.imagePath,
              member.heroImagePath
            );
            return (
              <div
                key={member.id}
                className="col-xl-4 col-md-6 mb-30"
                data-aos-duration="800"
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
              >
                <div className="team__two-card topy-tilt">
                  <div className="team__two-card-image">
                    <Image
                      className="team__two-card-image-normal"
                      src={member.imagePath}
                      alt={member.name}
                      width={680}
                      height={980}
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <Image
                      className="team__two-card-image-hero"
                      src={heroImagePath}
                      alt={`${member.name} hero`}
                      width={680}
                      height={980}
                      sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    />
                    <div className="team__two-card-badge">
                      <i className="fa-solid fa-bolt"></i>
                      <span>{member.availability}</span>
                    </div>
                  </div>
                  <div className="team__two-card-content">
                    <div>
                      <h5>{member.name}</h5>
                      <span>{member.role}</span>
                      <div className="team__two-card-meta">
                        <span>
                          <i className="fa-solid fa-briefcase"></i>
                          {member.experience}
                        </span>
                        <span>
                          <i className="fa-solid fa-location-dot"></i>
                          {member.serviceArea}
                        </span>
                      </div>
                      <div className="team__two-card-tags">
                        {member.specialties.slice(0, 2).map((specialty) => (
                          <span key={`${member.id}-${specialty}`}>{specialty}</span>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact" aria-label={`Contact ${member.name}`}>
                      <i className="fa-regular fa-arrow-up-right"></i>
                    </Link>
                    <details className="team__two-card-details">
                      <summary>
                        View profile
                        <i className="fa-regular fa-angle-down"></i>
                      </summary>
                      <div className="team__two-card-details-body">
                        <p>{member.shortProfile}</p>
                        <div className="team__two-card-details-specialties">
                          {member.specialties.map((specialty) => (
                            <span key={`${member.id}-detail-${specialty}`}>
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <ul>
                          {member.certifications.map((certification) => (
                            <li key={`${member.id}-detail-cert-${certification}`}>
                              <i className="fa-solid fa-shield-check"></i>
                              <span>{certification}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact">
                          {teamContent.contactMemberPrefix} {member.name}
                          <i className="fa-regular fa-angle-right"></i>
                        </Link>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
