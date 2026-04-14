"use client"

import { useRef, useState } from "react"

const logos: { src: string; alt: string; offset?: string }[] = [
  // Clientes principales — primero
  { src: "/logos-web/4.png",  alt: "Kubiec" },
  { src: "/logos-web/2.png",  alt: "Naviera Arauco" },
  { src: "/logos-web/10.png", alt: "Edyce" },
  { src: "/logos-web/13.png", alt: "Coipsa" },
  { src: "/logos-web/8.png",  alt: "Ferma" },
  // Resto
  { src: "/logos-web/14.png", alt: "AMCS" },
  { src: "/logos-web/12.png", alt: "Comedsa" },
  { src: "/logos-web/11.png", alt: "Ecdsur" },
  { src: "/logos-web/9.png",  alt: "Gymsa" },
  { src: "/logos-web/7.png",  alt: "Huemul HHH" },
  { src: "/logos-web/17.png", alt: "Emecon", offset: "-20px" },
  { src: "/logos-web/6.png",  alt: "Impo" },
  { src: "/logos-web/15.png", alt: "Imbal" },
  { src: "/logos-web/5.png",  alt: "JSR Liderlenc" },
  { src: "/logos-web/3.png",  alt: "Metalconf" },
  { src: "/logos-web/16.png", alt: "Miller" },
  { src: "/logos-web/1.png",  alt: "Sagrario" },
]

export function TrustedBySection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setDragging(true)
    setPaused(true)
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = "grabbing"
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  const onMouseUp = () => {
    setDragging(false)
    if (trackRef.current) trackRef.current.style.cursor = "grab"
  }

  const onMouseLeaveTrack = () => {
    if (dragging) {
      setDragging(false)
      if (trackRef.current) trackRef.current.style.cursor = "grab"
    }
  }

  return (
    <section className="py-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Ellos ya transformaron su planta
        </p>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }}
          />

          <div
            ref={trackRef}
            className="flex items-center overflow-x-scroll select-none"
            style={{
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeaveTrack}
          >
            {/* Inner strip — animated unless paused */}
            <div
              className={paused ? "flex items-center" : "flex animate-marquee items-center"}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 flex items-center justify-center"
                  style={{ width: "200px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    draggable={false}
                    className="transition-all duration-300"
                    style={{
                      height: "120px",
                      width: "auto",
                      maxWidth: "200px",
                      objectFit: "contain",
                      filter: "grayscale(1) opacity(0.55)",
                      pointerEvents: dragging ? "none" : "auto",
                      transform: logo.offset ? `translateY(${logo.offset})` : undefined,
                    }}
                    onMouseEnter={e => { if (!dragging) e.currentTarget.style.filter = "grayscale(0) opacity(1)" }}
                    onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(1) opacity(0.55)")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
