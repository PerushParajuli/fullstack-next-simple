// src/components/PlantModel.tsx
"use client";

import { useGLTF } from "@react-three/drei";

export default function PlantModel(props: any) {
  const { scene } = useGLTF("/models/plant.glb"); // Place model in public/models
  return <primitive object={scene} {...props} />;
}
