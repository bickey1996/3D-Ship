import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";

import "./styles.css";

extend({ OrbitControls });

const Ship = ({ ...props }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/caravel_ship/scene.gltf", setModel);
  });
  console.log(model);
  return model ? <primitive object={model.scene} {...props} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI}
      minPolarAngle={Math.PI / 4}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

export default () => {
  const isBrowser = typeof window !== "undefined";

  return (
    <>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <ambientLight intensity={0.8} />
          <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
          <fog attach="fog" args={["white", 10, 25]} />
          <Controls />

          <Ship scale={[2, 2, 2]} />
        </Canvas>
      )}
    </>
  );
};
