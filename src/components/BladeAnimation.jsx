import React from "react";
import { Canvas } from "@react-three/fiber";
import Shuriken from "./Shuriken";
import NinjaBg from '../assets/images/ninja-bg.jpg'
import BambooBg from '../assets/images/ninja-bg-bamboo.png'


const BladeAnimation = () => {
  return (
     <div
      id="blade-container"
      className="w-full h-[300px] overflow-x-hidden relative z-40"
    >
      <img src={BambooBg} className="w-full absolute h-[300px] opacity-100 select-none z-30" />
      <img src={NinjaBg} className="w-full absolute h-[300px] opacity-90 select-none" />
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shuriken/>
      </Canvas>
    </div>
  );
};

export default BladeAnimation;
