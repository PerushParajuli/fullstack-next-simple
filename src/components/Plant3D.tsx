"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Stage, useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

function PlantModel(props: any) {
  const { scene } = useGLTF("/models/plant.glb");
  scene.rotation.y = 0;
  return <primitive object={scene} {...props} />;
}

function CameraLookAtCenter() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.5, 2); // Zoomed in front view
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

export default function Plant3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        shadows={false} // Shadows off for performance
        dpr={[1, 1.5]} // Limit GPU load
        camera={{ fov: 50 }}
      >
        {/* Brighter lighting */}
        <ambientLight intensity={0.8} /> {/* increased from 0.5 */}
        <directionalLight position={[5, 10, 5]} intensity={1} />{" "}
        {/* increased from 0.8 */}
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />{" "}
        {/* fill light */}
        <CameraLookAtCenter />
        <Stage environment={null} intensity={1}>
          <PlantModel scale={2.5} />
        </Stage>
        {/* Static controls */}
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
   
        />
      </Canvas>
    </div>
  );
}
