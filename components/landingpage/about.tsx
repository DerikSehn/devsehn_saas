import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { VideoModal, VideoModalContent, VideoModalDescription, VideoModalTitle, VideoModalTrigger, VideoModalVideo, VideoPlayButton, VideoPlayer, VideoPreview } from "../ui/video-modal";
import { Section } from "./section/section";
import { motion } from "framer-motion";
import SectionHeader from "./section/section-header";
import Carousel from "../carousel/carousel";


export default function About() {
    return (
        <Section id="about" className="overflow-hidden relative py-12 md:py-24 lg:py-32 h-auto md:h-dvh flex-col rounded-tr-3xl shadow-lg">
            <SectionHeader title="Sobre a Cultura Verde"
                subtitle="Conheça um pouco mais sobre a Cultura Verde e o que fazemos"
            />
            <motion.div
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: 'easeInOut',
                    }
                }}
                className="size-full min-h-[50vh] w-full h-full"

            >

                <iframe
                    className="size-full min-h-[50vh] w-full h-full"
                    src="https://cultura-verde-bucket.s3.sa-east-1.amazonaws.com/video/video-apresentacao-culturaverde-1.mp4"
                    allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
                    allowFullScreen

                />
            </motion.div>

        </Section>
    )
}