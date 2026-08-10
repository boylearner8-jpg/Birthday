import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GiftBoxMesh = ({ isOpening, onClick }) => {
  const groupRef = useRef();
  const lidRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && !isOpening) {
      groupRef.current.rotation.y += delta * 0.4;
    }

    if (isOpening && lidRef.current) {
      // Lift lid upwards and tilt on open
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 2.5, delta * 4);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, -0.6, delta * 4);
      lidRef.current.rotation.z = THREE.MathUtils.lerp(lidRef.current.rotation.z, 0.4, delta * 4);
    }
  });

  return (
    <group ref={groupRef} onClick={onClick} cursor="pointer">
      {/* Box Base */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.2, 1.6]} />
        <meshStandardMaterial
          color="#be123c" // Deep Velvet Crimson
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Vertical Ribbon */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.63, 1.22, 0.35]} />
        <meshStandardMaterial
          color="#f59e0b" // Metallic Gold
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.35, 1.22, 1.63]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>

      {/* Lid Group */}
      <group ref={lidRef} position={[0, 0.45, 0]}>
        {/* Lid Box */}
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.35, 1.7]} />
          <meshStandardMaterial
            color="#e11d48"
            roughness={0.15}
            metalness={0.5}
          />
        </mesh>

        {/* Lid Ribbon Cross */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.72, 0.37, 0.37]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.37, 0.37, 1.72]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Bow on Top */}
        <mesh position={[0, 0.28, 0]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Glowing Sparkles inside gift */}
      <Sparkles
        count={30}
        scale={2.2}
        size={4}
        speed={0.6}
        color={isOpening ? "#fef08a" : "#fda4af"}
      />
    </group>
  );
};

export const GiftBox3D = ({ isOpening, onClick }) => {
  return (
    <div className="w-64 h-64 md:w-80 md:h-80 cursor-pointer relative mx-auto my-4 transition-transform active:scale-95">
      <Canvas
        camera={{ position: [0, 1.5, 4.2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2} color="#fff" />
        <pointLight position={[-3, 2, -2]} intensity={1.5} color="#fda4af" />
        <pointLight position={[0, -2, 2]} intensity={1} color="#fef08a" />

        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6}>
          <GiftBoxMesh isOpening={isOpening} onClick={onClick} />
        </Float>
      </Canvas>
    </div>
  );
};
