import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../../Loader";

const Kepler3 = () => {
    const kepler3 = useGLTF("./exoPlanetas/kepler3/kepler_midres.gltf");

    return (
        <primitive object={kepler3.scene} scale={2.5} position-y={0} rotation-y={0} />
    );
};

const Kepler3Canvas = () => {
    return (
        <Canvas
            shadows
            frameloop='demand'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                {/* AGREGAR LUCES AQUÍ */}
                <ambientLight intensity={2.5} /> {/* Luz ambiental: ilumina toda la escena por igual */}
                <Kepler3 />

                <Preload all />
            </Suspense>
        </Canvas>
    );
};

export default Kepler3Canvas;
