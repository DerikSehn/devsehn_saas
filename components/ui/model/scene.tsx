"use client"
import React, { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, ObjectMap } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { motion } from 'framer-motion-3d'
import { useMotionValue, useScroll, useTransform } from 'framer-motion'

const Models = [
    { title: 'Plant', url: '/model/plant.glb' },
    { title: 'House', url: '/model/house.glb' },

]

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url) as any
    return <primitive object={scene} />
}

export default function Scene() {
    const { title } = useControls({
        title: {
            options: Models.map(({ title }) => title)
        }
    })

    const { scrollYProgress } = useScroll({
        target: '#hero',
        offset: []
     })

     const distance = useTransform(scrollYProgress, [0, 1], [0, 10])

    return (
        <>
            <Canvas camera={{ position: [10, 3, 10], near: 0.1, far: 100, fov: 40 }}>
                <Environment files="/background/night.hdr" />
                <directionalLight position={[10, 10, 10]} intensity={0.5} shadow={{ mapSize: 1024 }} />
                <motion.group position={[0, 0, distance]}>
                    <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
                </motion.group>
                <OrbitControls />
                <Stats />
            </Canvas>
        </>
    )
}
