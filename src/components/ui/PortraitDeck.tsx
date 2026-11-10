"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { useEssentials } from "@/components/providers/PortfolioExperience";

const PORTRAITS = [
  { src: "/assets/profile.jpg", label: "Jose Raphael Jaro" },
  { src: "/assets/profile2.jpg", label: "Jose Raphael Jaro, alternate portrait" },
  { src: "/assets/reze.jpg", label: "Reze from Chainsaw Man" },
];

export function PortraitDeck() {
  const essentials = useEssentials();
  const id = useId().replaceAll(":", "");
  const [deck, setDeck] = useState({ active: 0, departing: null as number | null, motion: true });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => setDeck((current) => ({ ...current, departing: null, motion: false }));
    // A mode change cancels any in-flight card shuffle before its layers unmount.
    if (essentials) settle();
    preference.addEventListener("change", settle);
    return () => preference.removeEventListener("change", settle);
  }, [essentials]);

  return (
    <figure className="hero-portrait">
      <span className="portrait-coordinate" aria-hidden="true">13.93° N / 121.62° E</span>
      <button type="button" className="portrait-deck" data-motion={deck.motion}
        onClick={(event) => {
          const motion = !essentials && event.detail !== 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          setDeck((current) => ({ active: (current.active + 1) % PORTRAITS.length, departing: motion ? current.active : null, motion }));
        }}
        aria-label={`Change portrait. Currently ${PORTRAITS[deck.active].label}, ${deck.active + 1} of ${PORTRAITS.length}`}>
        {PORTRAITS.map((portrait, index) => {
          if (essentials && index !== deck.active) return null;
          const slot = (index - deck.active + PORTRAITS.length) % PORTRAITS.length;
          const departing = deck.departing === index;
          const maskId = `${id}-portrait-${index}`;
          return (
            <span key={portrait.src} className={`portrait-plane${index ? ` portrait-sheet portrait-sheet-${index}` : ""}`} style={{ zIndex: departing ? 4 : 3 - slot }} aria-hidden={slot !== 0}>
              <span className="portrait-card" data-slot={slot} data-departing={departing}
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
                  setDeck((current) => current.departing === index ? { ...current, departing: null } : current);
                }}>
                <span className="portrait-frame">
                  <span className="portrait-window">
                    <Image src={portrait.src} alt={slot === 0 ? portrait.label : ""} aria-hidden={slot !== 0} fill sizes="(max-width: 767px) 240px, 380px" priority={index === 0} className="portrait-photo" data-active={slot === 0} />
                    {!essentials && <><svg className="portrait-masks" width="0" height="0" aria-hidden="true" focusable="false">
                      <defs>
                        <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1" style={{ maskType: "alpha" }}>
                          {Array.from({ length: 80 }, (_, tile) => (
                            <rect key={tile} className="portrait-pixel" x={(tile % 8) / 8} y={Math.floor(tile / 8) / 10} width="0.126" height="0.101" style={{ "--pixel-delay": `${(tile * 17 % 11) * 15}ms` } as CSSProperties} />
                          ))}
                        </mask>
                      </defs>
                    </svg>
                    <Image src={portrait.src} alt="" aria-hidden="true" fill sizes="(max-width: 767px) 240px, 380px" className="portrait-color-photo" style={{ maskImage: `url(#${maskId})` }} /></>}
                    <span className="portrait-rail kanji-rail" lang="ja" aria-hidden="true">黄昏</span>
                  </span>
                  <span className="portrait-caption">
                    <span>{index === 2 ? "Reze · Chainsaw Man" : "A face behind the code"}</span>
                    <span className="inline-flex items-center gap-2" aria-hidden="true"><RefreshCw size={12} /> {index + 1} / {PORTRAITS.length}</span>
                  </span>
                </span>
              </span>
            </span>
          );
        })}
      </button>
      <p className="mt-3 text-xs text-muted text-right">Click the portrait to shuffle.</p>
    </figure>
  );
}
