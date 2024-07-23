import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { VideoModal, VideoModalTrigger, VideoModalContent, VideoModalTitle, VideoModalDescription, VideoModalVideo, VideoPreview, VideoPlayButton, VideoPlayer } from "../ui/video-modal";
import { Section } from "./section";


export default function About() {
    return (
        <Section id="about" className="overflow-hidden py-12 md:py-24 lg:py-32 ">

            <VideoModal>
                <VideoModalTrigger
                    className="bg-primary text-white hover:bg-primary/80 hover:text-white/80 transition-all duration-500 rounded-full p-4 px-8 text-sm font-medium shadow-sm"
                >Open modal
                </VideoModalTrigger>
                <VideoModalContent>
                    <VideoModalTitle>Modal Video Demo</VideoModalTitle>
                    <VideoModalDescription>
                        Your subtitle or description here
                    </VideoModalDescription>
                    <VideoModalVideo>
                        <VideoPlayer>
                            <VideoPreview>
                                <img
                                    src="https://cdn.dribbble.com/userupload/4145843/file/original-c7a2c9a768450460259f232259d103d2.png?resize=1600x1200"
                                    alt="Video preview"
                                />
                            </VideoPreview>
                            <VideoPlayButton
                                className="absolute inset-0 m-auto flex size-32 items-center justify-center rounded-full border border-white border-white/10 bg-white/50 transition duration-300 hover:bg-white/75"
                            >
                                <PlayCircle className="size-20 stroke-1 text-white" />
                            </VideoPlayButton>
                            <iframe
                                className="size-full"
                                src="https://cdn.magicui.design/globe.mp4"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowFullScreen
                            />
                        </VideoPlayer>
                    </VideoModalVideo>
                </VideoModalContent>
            </VideoModal>
        </Section>
    )
}