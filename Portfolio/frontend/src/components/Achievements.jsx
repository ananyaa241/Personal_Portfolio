import React from 'react';

export default function Achievements() {
    const cards = [
        {
            topText: "TOP 2%",
            subtitle: "NATIONAL FINALIST",
            org: "India-AI Impact Summit 2026",
            project: "AI Voice Detection API",
            rotation: "-rotate-1",
            link: "https://drive.google.com/file/d/1jlYD0EkXQnbXwsK3L09lpAahoLJxFBLr/view",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2">
                    <rect x="7" y="3" width="10" height="2" fill="#EFA6C7" />
                    <rect x="6" y="5" width="12" height="6" fill="#EFA6C7" />
                    <rect x="4" y="5" width="2" height="4" fill="#C8D83F" />
                    <rect x="18" y="5" width="2" height="4" fill="#C8D83F" />
                    <rect x="9" y="11" width="6" height="2" fill="#EFA6C7" />
                    <rect x="11" y="13" width="2" height="6" fill="#EFA6C7" />
                    <rect x="7" y="19" width="10" height="2" fill="#C8D83F" />
                </svg>
            )
        },
        {
            topText: "2ND",
            subtitle: "RUNNER-UP",
            org: "GENAI Forge",
            project: "Full-Stack Movie Script Generator",
            rotation: "rotate-1",
            link: "https://drive.google.com/file/d/18U1T8GrXdeCM0JWYjW5eX-BP2VS0gnPI/view",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2">
                    <rect x="9" y="2" width="6" height="4" fill="#6B7280" />
                    <rect x="6" y="6" width="12" height="12" fill="#93C5FD" />
                    <text x="12" y="15" fontSize="10" fontWeight="bold" fill="#171313" textAnchor="middle">2</text>
                </svg>
            )
        },
        {
            topText: "RUNNER-UP",
            subtitle: "UI/UX Hackathon",
            org: "",
            project: "Interactive Bakery Experience",
            rotation: "-rotate-[0.5deg]",
            link: "https://drive.google.com/file/d/1mp0xQl9my455k00MClTpjlDZYXzsAaBg/view",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2">
                    <circle cx="12" cy="8" r="6" fill="#EFA6C7" />
                    <path d="M9 13 L7 22 L12 19 L17 22 L15 13" fill="#EFA6C7" />
                </svg>
            )
        },
        {
            topText: "ELITE + GOLD",
            subtitle: "NPTEL",
            org: "",
            project: "Programming in Java",
            rotation: "rotate-1",
            link: "https://drive.google.com/file/d/11MPWFgh9bNXbaa9v423AgMpD3BsfAcRB/view",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2">
                    <circle cx="12" cy="12" r="8" fill="#FBBF24" />
                    <circle cx="12" cy="12" r="5" fill="#F59E0B" />
                    <path d="M12 2 L14 7 L19 7 L15 10 L16 15 L12 12 L8 15 L9 10 L5 7 L10 7 Z" fill="#FEF3C7" />
                </svg>
            )
        }
    ];

    return (
        <section className="w-full flex justify-center py-16 px-4 md:px-12 bg-[#FFC5E5]">
            <div className="w-full max-w-7xl bg-[#3B211D] p-8 md:p-16 border-2 border-[#171313] shadow-[0_12px_40px_rgba(23,19,19,0.3)] shadow-[#171313]/50 relative overflow-hidden">

                {/* Header Section */}
                <div className="flex flex-col mb-12 md:mb-16 relative z-10 w-full">
                    <h2 className="mt-4 font-display font-bold text-5xl max-w-[100vw] md:text-7xl text-[#FFF8E8] uppercase tracking-tighter leading-none break-words">
                        WINS I'M PROUD OF
                    </h2>
                    <svg className="w-32 md:w-48 h-3 mt-2 -ml-2 text-[#EFA6C7]" viewBox="0 0 200 12" fill="none">
                        <path d="M2,10 Q50,2 100,8 T198,4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-20">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className={`bg-[#FFF8E8] rounded-xl border border-[#171313] shadow-[4px_6px_0px_rgba(23,19,19,1)] p-6 flex flex-col items-center text-center transform ${card.rotation} transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[4px_8px_0px_rgba(23,19,19,1)] relative`}
                            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23171313\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}
                        >
                            {/* Sticker tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/70 border border-[#171313]/20 rotate-2 shadow-sm rounded-sm backdrop-blur-sm"></div>

                            {card.icon}

                            <h3 className="font-display font-bold text-3xl md:text-4xl text-[#171313] mt-2 leading-[0.9]">
                                {card.topText}
                            </h3>

                            <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-[#C95285] mt-3 block">
                                {card.subtitle}
                            </span>

                            <span className="font-sans font-bold text-lg text-[#171313] mt-2 block leading-tight">
                                {card.org}
                            </span>

                            {card.org && <span className="font-sans text-xs text-[#171313] mt-1 block opacity-80">{card.project}</span>}
                            {!card.org && <span className="font-sans font-bold text-lg text-[#171313] mt-1 block leading-tight opacity-80">{card.project}</span>}

                            {/* Spacer */}
                            <div className="flex-grow min-h-[1rem]"></div>

                            <a href={card.link} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-[#EFA6C7] text-[#171313] font-sans font-bold text-xs uppercase tracking-widest border border-[#171313] rounded-full shadow-[2px_2px_0px_#171313] hover:bg-[#C8D83F] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#171313] transition-all">
                                Certificate
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
