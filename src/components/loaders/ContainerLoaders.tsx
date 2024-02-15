

import React from 'react'
import { ColorRing, LineWave } from 'react-loader-spinner'
import { motion } from "framer-motion"
import { framerAnimation } from '../../theme/animation/MotionConfigs'
type Props = {}

function ContainerLoaders({ }: Props) {
    return (
        <div>
            <ColorRing
                visible={true}
                ariaLabel="color-ring-loading"
                wrapperStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                    height:"50%"
                }}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                
            />
        </div>
    )
}
export default ContainerLoaders



export function LineWaveLoader({ height = "100", width = "100", visible = true, animation = framerAnimation.left2right }) {
    return (
        <motion.div
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={animation.transition}
        >
            <LineWave
                visible={visible}
                height={height}
                width={width}
                ariaLabel="loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
        </motion.div>
    )
}