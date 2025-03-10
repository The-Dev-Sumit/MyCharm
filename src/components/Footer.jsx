import React, { useRef, useState, useEffect, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Bloom, Outline } from "@react-three/postprocessing";



const Moon = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/moon.glb"); 

  console.log(nodes); // Debugging to inspect structure of the GLTF model

  // Correctly handle the node based on your GLTF structure
  if (!nodes.mesh_0) {
    console.error("mesh_0 is undefined. Check the GLTF structure.");
    return null; // Prevent rendering if mesh_0 is missing
  }

  return (
    <mesh
      ref={ref}
      geometry={nodes.mesh_0.geometry}
      scale={[3, 3, 3]} // Adjust the scale to make the moon larger
      position={[0, 0, 0]} // Center the moon
      onPointerEnter={props.onPointerEnter} // Detect hover start
      onPointerLeave={props.onPointerLeave} // Detect hover end
      onPointerDown={props.onPointerDown} // Detect drag start
      onPointerUp={props.onPointerUp} // Detect drag end
    >
      <meshStandardMaterial {...nodes.mesh_0.material} 
       emissive="white"
        emissiveIntensity={.01}
        roughness={0.5} // Reduce roughness for better light distribution
        metalness={0}
      />
    </mesh>
  );
});


const Footer = () => {

  const moonRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

   // Start dragging
  const handlePointerDown = () => {
    setIsDragging(true);
  };

  // Stop dragging
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (isDragging && moonRef.current) {
      const { movementX, movementY } = e;
      moonRef.current.rotation.y += movementX * 0.01;
      moonRef.current.rotation.x += movementY * 0.01;
    }
  };

  const handlePointerEnter = () => setHovering(true);
  const handlePointerLeave = () => setHovering(false);

   useEffect(() => {
      const load = setTimeout(() => {
        setIsLoading(false);
      }, 3000)
  
      return () => clearTimeout(load)
   })
  
  const getRandomDelay = () => `${Math.random() * 3}s`;

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[300px] absolute animate-pulse bg-gray-400">
          <h1 className="w-[20%] h-[40px] absolute top-[13%] left-[38%] animate-pulse bg-gray-500"></h1>
          <div className="w-[170px] h-[170px] rounded-full absolute top-[23%] left-[9%] animate-pulse bg-gray-500"></div>
        </div>
      ) : (
        <div className="h-[300px] w-full overflow-hidden relative py-6 bg-black">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[1.5rem] font-Lemon select-none text-slate-300 drop-shadow-md leading-normal capitalize">
              Thank You for <span className="text-blue-300">Visiting</span>
            </h1>
          </div>
          <div className="control-star top-0 absolute h-screen w-full">
            {[...Array(80)].map((_, index) => (
              <div
                key={index}
                className="star"
                style={{
                  top: `${Math.random() * 30 + 1}%`, // Randomize position slightly
                  left: `${Math.random() * 93 + 1}%`,
                  animationDelay: getRandomDelay(), // Assign random delay
                }}></div>
            ))}
          </div>

          <div className="absolute h-[170px] bg-transparent cursor-grab w-[170px] bottom-[25%] left-[10%] rounded-full z-30 border-none shadow-white">
            <Canvas onPointerMove={handlePointerMove} shadows>
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Moon
                  ref={moonRef}
                  onPointerEnter={handlePointerEnter}
                  onPointerLeave={handlePointerLeave} // Pass hover end handler
                  onPointerDown={handlePointerDown} // Pass drag start handler
                  onPointerUp={handlePointerUp} // Pass drag end handler
                />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enableRotate={false}
                enablePan={false}
              />
              <EffectComposer>
                <Bloom
                  intensity={0.5}
                  luminanceThreshold={0.2}
                  luminanceSmoothing={0.8}
                />
                <Outline
                  edgeStrength={3} // Thickness of the glow
                  edgeGlow={3} // Glow intensity
                  edgeThickness={0.5} // Edge thickness
                  visibleEdgeColor="white" // Glow color
                  hiddenEdgeColor="black"
                />
              </EffectComposer>
            </Canvas>
            <h2 className="uppercase tracking-normal opacity-[13%] font-bold text-gray-400 text-[1.1rem] absolute top-[99%] left-[50%] translate-x-[-50%] w-20 translate-y-[-1%]">grab me</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;