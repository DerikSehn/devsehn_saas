import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { VideoModal, VideoModalContent, VideoModalDescription, VideoModalTitle, VideoModalTrigger, VideoModalVideo, VideoPlayButton, VideoPlayer, VideoPreview } from "../ui/video-modal";
import { Section } from "./section/section";


export default function About() {
    return (
        <Section id="about" className="overflow-hidden py-12 md:py-24 lg:py-32 ">

            <VideoModal>
                <VideoModalTrigger
                    className="absolute z-0 inset-20 bg-primary text-white hover:bg-primary/80 hover:text-white/80 transition-all duration-500 rounded-full p-4 px-8 text-sm font-medium shadow-sm"
                >
                    <Image
                        fill
                        className="object-cover brightness-75 blur-sm"
                        src="https://cultura-verde-bucket.s3.sa-east-1.amazonaws.com/video/video-apresentacao-culturaverde-preview.png"
                        alt="Video Trigger"
                    />
                    <span className="absolute inset-0 m-auto flex size-32 items-center justify-center rounded-full border border-white border-white/10 bg-white/50 transition duration-300 hover:bg-white/75">

                        <PlayCircle className="absolute  size-20 stroke-1 text-white" />
                    </span>
                </VideoModalTrigger>
                <VideoModalContent>
                    <VideoModalTitle>Video sobre a Cultura verde</VideoModalTitle>
                    <VideoModalDescription>
                        Confira o video de apresentação da Cultura Verde
                    </VideoModalDescription>
                    <VideoModalVideo>
                        <VideoPlayer>
                            <VideoPreview className="relative">
                                <Image
                                    fill
                                    className="object-cover"
                                    src="https://cultura-verde-bucket.s3.sa-east-1.amazonaws.com/video/video-apresentacao-culturaverde-preview.png"
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
                                src="https://cultura-verde-bucket.s3.sa-east-1.amazonaws.com/video/video-apresentacao-culturaverde-2.mp4"
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