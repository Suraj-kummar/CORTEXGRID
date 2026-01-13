"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function GridPoints() {
    const ref = useRef<THREE.Points>(null!);

    const points = useMemo(() => {
        const p = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = 2.5;
            p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            p[i * 3 + 2] = r * Math.cos(phi);
        }
        return p;
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.y += delta * 0.1;
        ref.current.rotation.x += delta * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function GlobalGrid() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <GridPoints />
                <Sphere args={[2.45, 64, 64]}>
                    <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.1} />
                </Sphere>
            </Canvas>
        </div>
    );
}
