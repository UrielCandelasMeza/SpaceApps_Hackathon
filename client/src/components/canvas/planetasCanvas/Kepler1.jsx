import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function Kepler1() {
    const { scene } = useGLTF("../src/assets/exoPlanetas/kepler1/mundo_lowres.gltf") // ruta pública
    return <primitive object={scene} scale={1} />
}

export default function Kepler() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Kepler1 />
            <OrbitControls />
        </Canvas>
    )
}
