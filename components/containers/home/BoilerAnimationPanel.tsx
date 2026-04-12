"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

type RepairPhase = {
  temp: string;
  label: string;
  progress: number;
  gauge: number;
  taskIndex: number;
  timelineStep: number;
  chipLevel: number;
};

type RepairTask = {
  label: string;
  icon: string;
};

type BoilerAnimationPanelProps = {
  className?: string;
  aosDelay?: number;
};

const fallbackRepairTasks: RepairTask[] = [
  { label: "Ignition check", icon: "fa-solid fa-bolt" },
  { label: "Pressure balance", icon: "fa-solid fa-gauge-high" },
  { label: "Combustion test", icon: "fa-solid fa-fire" },
];

const fallbackRepairPhases: RepairPhase[] = [
  {
    temp: "41°",
    label: "Sensor sweep",
    progress: 16,
    gauge: -42,
    taskIndex: 0,
    timelineStep: 0,
    chipLevel: 1,
  },
  {
    temp: "56°",
    label: "Valve calibration",
    progress: 48,
    gauge: 16,
    taskIndex: 1,
    timelineStep: 1,
    chipLevel: 2,
  },
  {
    temp: "68°",
    label: "Combustion tuning",
    progress: 78,
    gauge: 32,
    taskIndex: 2,
    timelineStep: 1,
    chipLevel: 2,
  },
  {
    temp: "72°",
    label: "System verified",
    progress: 100,
    gauge: 8,
    taskIndex: 2,
    timelineStep: 2,
    chipLevel: 3,
  },
];

const BoilerAnimationPanel = ({
  className = "",
  aosDelay = 200,
}: BoilerAnimationPanelProps) => {
  const { content } = useSiteContent();
  const boilerAnimationContent = content.home.boilerAnimation;
  const [phaseIndex, setPhaseIndex] = useState(0);

  const repairTasks =
    boilerAnimationContent.repairTasks.length > 0
      ? boilerAnimationContent.repairTasks
      : fallbackRepairTasks;

  const repairPhases = useMemo(() => {
    return fallbackRepairPhases.map((phase, index) => ({
      ...phase,
      label: boilerAnimationContent.phases[index]?.label || phase.label,
      temp: boilerAnimationContent.phases[index]?.temp || phase.temp,
    }));
  }, [boilerAnimationContent.phases]);

  const timelineLabels =
    boilerAnimationContent.timelineLabels.length >= 3
      ? boilerAnimationContent.timelineLabels
      : ["Diagnose", "Repair", "Verified"];
  const statusChips =
    boilerAnimationContent.statusChips.length >= 3
      ? boilerAnimationContent.statusChips
      : ["Flow Stable", "Safe Pressure", "Repair Pass"];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % repairPhases.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [repairPhases.length]);

  const phase = repairPhases[phaseIndex];
  const ambientTemp = Math.min(23, 18 + phase.timelineStep + (phaseIndex > 1 ? 1 : 0));
  const targetTemp = ambientTemp + 1;
  const smartDialFill = Math.min(94, 48 + phase.progress * 0.42);
  const signalLevel = Math.min(4, 1 + phase.timelineStep + (phaseIndex > 1 ? 1 : 0));
  const energyTrend = [42, 58, 51, 66, 60].map((base, index) =>
    Math.min(92, base + phase.timelineStep * 4 - (index === 2 ? phaseIndex * 2 : 0))
  );
  const roomNodes = [
    { label: "Lounge", temp: ambientTemp + 1, active: true },
    { label: "Kitchen", temp: ambientTemp, active: phaseIndex > 0 },
    { label: "Hall", temp: ambientTemp - 1, active: phaseIndex > 1 },
    { label: "Bedroom", temp: ambientTemp + 2, active: phaseIndex > 1 },
  ];
  const liveFeed = [
    `Thermostat synced ${ambientTemp}\u00b0`,
    `${repairTasks[phase.taskIndex]?.label || "System check"} running`,
    phaseIndex === repairPhases.length - 1 ? "Comfort profile balanced" : "Sensors re-calibrating",
  ];

  return (
    <div
      className={["banner__two-image", className].filter(Boolean).join(" ")}
      data-aos-duration="800"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <div
        className="banner__two-image-stage banner__two-image-stage--boiler"
        data-repair-step={phaseIndex}
      >
        <div className="banner__two-boiler-grid"></div>
        <div className="banner__two-boiler-ring"></div>
        <span className="banner__two-tech-pulse pulse-1"></span>
        <span className="banner__two-tech-pulse pulse-2"></span>
        <span className="banner__two-tech-pulse pulse-3"></span>
        <div className="banner__two-circuit-stream">
          <span className="route route-1">
            <em></em>
          </span>
          <span className="route route-2">
            <em></em>
          </span>
          <span className="route route-3">
            <em></em>
          </span>
        </div>
        <div className="banner__two-boiler-floor"></div>
        <div className="banner__two-phase-hud">
          <span>{boilerAnimationContent.hudLabel}</span>
          <strong>{phase.label}</strong>
          <small>
            {boilerAnimationContent.phasePrefix} {phaseIndex + 1}/
            {repairPhases.length} · {boilerAnimationContent.targetPrefix}{" "}
            {phase.temp}
          </small>
        </div>
        <div className="banner__two-smart-hub">
          <div className="banner__two-smart-hub-head">
            <span>Smart Thermostat</span>
            <div className="banner__two-smart-hub-signal" data-level={signalLevel}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="banner__two-smart-hub-dial">
            <div
              className="banner__two-smart-hub-dial-ring"
              style={{
                background: `conic-gradient(from -90deg, #22c55e 0deg ${smartDialFill * 3.6}deg, #d8e3f0 ${smartDialFill * 3.6}deg 360deg)`,
              }}
            >
              <div className="banner__two-smart-hub-dial-core">
                <strong>{ambientTemp}&deg;</strong>
                <span>Target {targetTemp}&deg;</span>
              </div>
            </div>
            <div className="banner__two-smart-hub-dial-copy">
              <strong>{phaseIndex === repairPhases.length - 1 ? "Eco Ready" : "Learning"}</strong>
              <span>Nest-style comfort sync</span>
            </div>
          </div>
          <div className="banner__two-smart-hub-trend">
            {energyTrend.map((value, index) => (
              <span
                key={`energy-${index}`}
                style={{ height: `${value}%` }}
                className={index === energyTrend.length - 1 ? "is-current" : ""}
              ></span>
            ))}
          </div>
        </div>
        <div className="banner__two-climate-map">
          <div className="banner__two-climate-map-head">
            <span>Connected Rooms</span>
            <strong>{phaseIndex === repairPhases.length - 1 ? "Optimized" : "Balancing"}</strong>
          </div>
          <div className="banner__two-climate-map-grid">
            <div className="banner__two-climate-map-core">
              <i className="fa-solid fa-house-signal"></i>
            </div>
            {roomNodes.map((room, index) => (
              <div
                key={room.label}
                className={[
                  "banner__two-climate-node",
                  `node-${index + 1}`,
                  room.active ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{room.label}</span>
                <strong>{room.temp}&deg;</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="banner__two-repair-stream">
          {repairTasks.map((task, index) => {
            const isDone = phaseIndex === repairPhases.length - 1 || index < phase.taskIndex;
            const isActive =
              phaseIndex !== repairPhases.length - 1 && index === phase.taskIndex;

            return (
              <div
                key={task.label}
                className={[
                  "banner__two-repair-stream-item",
                  isDone ? "is-done" : "",
                  isActive ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <i className={task.icon}></i>
                <span>{task.label}</span>
                <em></em>
              </div>
            );
          })}
        </div>
        <div className="banner__two-boiler">
          <div className="banner__two-boiler-top">
            <span>{boilerAnimationContent.boilerStatusTitle}</span>
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="banner__two-boiler-screws">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="banner__two-boiler-body">
            <div className="banner__two-boiler-gauge">
              <div
                className="banner__two-boiler-gauge-needle"
                style={{
                  transform: `translate(-50%, -90%) rotate(${phase.gauge}deg)`,
                }}
              ></div>
            </div>
            <div className="banner__two-boiler-display">
              <span className="value">{phase.temp}</span>
              <span className="label">{phase.label}</span>
            </div>
            <div className="banner__two-boiler-leds">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="banner__two-boiler-wave">
              <span></span>
            </div>
            <div className="banner__two-boiler-core">
              <span></span>
              <span></span>
            </div>
            <div className="banner__two-boiler-scan">
              <span></span>
            </div>
            <div className="banner__two-boiler-progress">
              <span style={{ width: `${phase.progress}%` }}></span>
            </div>
          </div>
          <div className="banner__two-boiler-pipe banner__two-boiler-pipe--left"></div>
          <div className="banner__two-boiler-pipe banner__two-boiler-pipe--right"></div>
        </div>
        <div className="banner__two-boiler-hologram">
          <span className="frame frame-1"></span>
          <span className="frame frame-2"></span>
          <span className="frame frame-3"></span>
          <span className="frame frame-4"></span>
        </div>
        <div className="banner__two-repair-arm">
          <span className="banner__two-repair-arm-base"></span>
          <span className="banner__two-repair-arm-segment segment-1"></span>
          <span className="banner__two-repair-arm-segment segment-2"></span>
          <span className="banner__two-repair-arm-head">
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </span>
        </div>
        <div className="banner__two-boiler-status">
          <div
            className={
              "banner__two-boiler-chip chip-1" + (phase.chipLevel > 0 ? " is-active" : "")
            }
          >
            <i className="fa-solid fa-wave-square"></i>
            <span>{statusChips[0]}</span>
          </div>
          <div
            className={
              "banner__two-boiler-chip chip-2" + (phase.chipLevel > 1 ? " is-active" : "")
            }
          >
            <i className="fa-solid fa-gauge-high"></i>
            <span>{statusChips[1]}</span>
          </div>
          <div
            className={
              "banner__two-boiler-chip chip-3" + (phase.chipLevel > 2 ? " is-active" : "")
            }
          >
            <i className="fa-solid fa-shield-check"></i>
            <span>{statusChips[2]}</span>
          </div>
        </div>
        <span className="banner__two-boiler-spark spark-1"></span>
        <span className="banner__two-boiler-spark spark-2"></span>
        <span className="banner__two-boiler-spark spark-3"></span>
        <span className="banner__two-boiler-spark spark-4"></span>
        <span className="banner__two-boiler-spark spark-5"></span>
        <span className="banner__two-boiler-spark spark-6"></span>
        <span className="banner__two-boiler-steam steam-1"></span>
        <span className="banner__two-boiler-steam steam-2"></span>
        <span className="banner__two-boiler-steam steam-3"></span>
        <div className="banner__two-emergency">
          <div className="banner__two-emergency-icon">
            <i className="fa-light fa-phone-volume"></i>
          </div>
          <div className="banner__two-emergency-title">
            <h3>{boilerAnimationContent.emergencyTitle}</h3>
            <span>{boilerAnimationContent.emergencySubtitle}</span>
          </div>
        </div>
        <div className="banner__two-repair-timeline">
          <div className="banner__two-repair-timeline-track">
            <span style={{ transform: `scaleX(${phase.progress / 100})` }}></span>
          </div>
          <div className="banner__two-repair-timeline-steps">
            <span className={phase.timelineStep >= 0 ? "is-active" : ""}>
              {timelineLabels[0]}
            </span>
            <span className={phase.timelineStep >= 1 ? "is-active" : ""}>
              {timelineLabels[1]}
            </span>
            <span className={phase.timelineStep >= 2 ? "is-active" : ""}>
              {timelineLabels[2]}
            </span>
          </div>
        </div>
        <div className="banner__two-live-feed">
          <span className="banner__two-live-feed-title">Live Feed</span>
          {liveFeed.map((item, index) => (
            <div key={`${item}-${index}`} className="banner__two-live-feed-item">
              <em></em>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoilerAnimationPanel;
