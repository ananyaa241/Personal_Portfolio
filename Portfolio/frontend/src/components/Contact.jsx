import React, { useState } from 'react';
import EasterEggVideo from './EasterEggVideo';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const defaultMessage = `Hi Sai Ananya,\n\nI am happy to connect and would love to build something great together!\n\nBest,\n${name}\n${email}`;
        const finalMessage = message.trim() ? message : defaultMessage;

        const mailtoLink = `mailto:brightside7806@gmail.com?subject=Connection Request from ${name}&body=${encodeURIComponent(finalMessage)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section id="contact" className="w-full flex flex-col items-center pb-2 mt-16 relative">
            <div className="bg-portfolio-cream p-10 md:p-16 border-2 border-portfolio-brown shadow-[16px_16px_0px_#401F18] w-full max-w-4xl flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="font-display font-bold text-6xl md:text-7xl text-portfolio-pink uppercase leading-[0.85] tracking-tighter text-stroke-2">
                            <span className="text-portfolio-brown text-stroke-0 block">LET'S CONNECT</span>
                        </h2>
                        <p className="mt-6 font-serif italic text-lg text-portfolio-brown/80 max-w-xs">
                            "Have an idea, project or opportunity? Let's build something interesting."
                        </p>
                    </div>

                    <div className="mt-12 bg-portfolio-lime border-[1.5px] border-portfolio-brown p-6 hidden md:block transform -rotate-2 w-max">
                        <div className="flex flex-col gap-2 font-display font-bold text-sm tracking-wide text-portfolio-brown uppercase">
                            <a href="https://www.linkedin.com/in/sai-ananya-gajjala-8376bb387/" target="_blank" rel="noreferrer" className="hover:text-portfolio-pink transition-colors">LinkedIn</a>
                            <a href="https://github.com/ananyaa241" target="_blank" rel="noreferrer" className="hover:text-portfolio-pink transition-colors">GitHub</a>
                            <a href="mailto:brightside7806@gmail.com" className="hover:text-portfolio-pink transition-colors">Email</a>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-1">
                            <label className="font-display font-bold text-xs tracking-widest text-portfolio-black uppercase">Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-b-[1.5px] border-portfolio-brown py-2 font-sans font-medium outline-none focus:border-portfolio-pink transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-display font-bold text-xs tracking-widest text-portfolio-black uppercase">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-b-[1.5px] border-portfolio-brown py-2 font-sans font-medium outline-none focus:border-portfolio-pink transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-display font-bold text-xs tracking-widest text-portfolio-black uppercase">Message</label>
                            <textarea
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="bg-transparent border-b-[1.5px] border-portfolio-brown py-2 font-sans font-medium outline-none focus:border-portfolio-pink transition-colors resize-none"
                                placeholder="(Optional) Tell me about your project..."
                            ></textarea>
                        </div>

                        <button type="submit" className="bg-portfolio-brown text-portfolio-cream font-display font-bold uppercase tracking-widest py-4 mt-4 hover:bg-portfolio-black transition-colors w-full">
                            SEND
                        </button>
                    </form>

                    <div className="mt-8 flex gap-4 md:hidden">
                        <a href="https://www.linkedin.com/in/sai-ananya-gajjala-8376bb387/" target="_blank" rel="noreferrer" className="font-display font-bold text-xs uppercase hover:text-portfolio-pink">LinkedIn</a>
                        <a href="https://github.com/ananyaa241" target="_blank" rel="noreferrer" className="font-display font-bold text-xs uppercase hover:text-portfolio-pink">GitHub</a>
                        <a href="mailto:brightside7806@gmail.com" className="font-display font-bold text-xs uppercase hover:text-portfolio-pink">Email</a>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center w-full z-10 font-display font-bold text-[10px] tracking-widest uppercase text-portfolio-brown/40">
                © {new Date().getFullYear()} Sai Ananya. All Rights Reserved.
            </div>

            <EasterEggVideo />
        </section>
    );
}
