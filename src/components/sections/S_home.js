import { NavBarBotHome } from "../NavBar/NavBarBotHome";
import { Navbartop } from "../NavBar/NavBarTop";

export function S_home() {
    return (
        <section className="relative h-96 overflow-hidden">
            <Navbartop/>

            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2">
                <iframe
                    className="w-full h-[125%] pointer-events-none"
                    src="https://www.youtube.com/embed/TBy_ZZ7zs4Q?autoplay=1&mute=1&loop=1&playlist=TBy_ZZ7zs4Q&start=2&controls=0&disablekb=1&modestbranding=1&rel=0"
                    title="YouTube video"
                    frameBorder="0"
                    allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </div>
            </div>

            <NavBarBotHome/>
        </section>
    );
}
