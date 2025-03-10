import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  uniform float uShapeProgress;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  // Define polygon vertices individually (GLSL ES 1.00 compatibility)
  const vec2 v0 = vec2(0.50, 0.00); // 50% 0%
  const vec2 v1 = vec2(0.61, 0.35); // 61% 35%
  const vec2 v2 = vec2(0.98, 0.35); // 98% 35%
  const vec2 v3 = vec2(0.68, 0.57); // 68% 57%
  const vec2 v4 = vec2(0.79, 0.91); // 79% 91%
  const vec2 v5 = vec2(0.50, 0.70); // 50% 70%
  const vec2 v6 = vec2(0.21, 0.91); // 21% 91%
  const vec2 v7 = vec2(0.32, 0.57); // 32% 57%
  const vec2 v8 = vec2(0.02, 0.35); // 2% 35%
  const vec2 v9 = vec2(0.39, 0.35); // 39% 35%
  
  // Point-in-polygon test without arrays or modulus
  float insidePolygon(vec2 p) {
    float crossings = 0.0;
    
    if (((v0.y <= p.y && v1.y > p.y) || (v0.y > p.y && v1.y <= p.y)) && 
        (p.x < (v1.x - v0.x) * (p.y - v0.y) / (v1.y - v0.y) + v0.x)) crossings += 1.0;
    if (((v1.y <= p.y && v2.y > p.y) || (v1.y > p.y && v2.y <= p.y)) && 
        (p.x < (v2.x - v1.x) * (p.y - v1.y) / (v2.y - v1.y) + v1.x)) crossings += 1.0;
    if (((v2.y <= p.y && v3.y > p.y) || (v2.y > p.y && v3.y <= p.y)) && 
        (p.x < (v3.x - v2.x) * (p.y - v2.y) / (v3.y - v2.y) + v2.x)) crossings += 1.0;
    if (((v3.y <= p.y && v4.y > p.y) || (v3.y > p.y && v4.y <= p.y)) && 
        (p.x < (v4.x - v3.x) * (p.y - v3.y) / (v4.y - v3.y) + v3.x)) crossings += 1.0;
    if (((v4.y <= p.y && v5.y > p.y) || (v4.y > p.y && v5.y <= p.y)) && 
        (p.x < (v5.x - v4.x) * (p.y - v4.y) / (v5.y - v4.y) + v4.x)) crossings += 1.0;
    if (((v5.y <= p.y && v6.y > p.y) || (v5.y > p.y && v6.y <= p.y)) && 
        (p.x < (v6.x - v5.x) * (p.y - v5.y) / (v6.y - v5.y) + v5.x)) crossings += 1.0;
    if (((v6.y <= p.y && v7.y > p.y) || (v6.y > p.y && v7.y <= p.y)) && 
        (p.x < (v7.x - v6.x) * (p.y - v6.y) / (v7.y - v6.y) + v6.x)) crossings += 1.0;
    if (((v7.y <= p.y && v8.y > p.y) || (v7.y > p.y && v8.y <= p.y)) && 
        (p.x < (v8.x - v7.x) * (p.y - v7.y) / (v8.y - v7.y) + v7.x)) crossings += 1.0;
    if (((v8.y <= p.y && v9.y > p.y) || (v8.y > p.y && v9.y <= p.y)) && 
        (p.x < (v9.x - v8.x) * (p.y - v8.y) / (v9.y - v8.y) + v8.x)) crossings += 1.0;
    if (((v9.y <= p.y && v0.y > p.y) || (v9.y > p.y && v0.y <= p.y)) && 
        (p.x < (v0.x - v9.x) * (p.y - v9.y) / (v0.y - v9.y) + v9.x)) crossings += 1.0;
    
    return step(1.0, crossings - 2.0 * floor(crossings / 2.0)); // Modulus workaround
  }
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if (uAlphaParticles < 0.5) {
      if (d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d);
      float poly = insidePolygon(uv);
      float shape = mix(circle, poly, uShapeProgress);
      float alpha = shape * 0.8;
      if (alpha < 0.1) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), alpha);
    }
  }
`;

const AnimatedContent = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  shapeProgress = 0,
  className,
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        uShapeProgress: { value: shapeProgress },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;
      program.uniforms.uShapeProgress.value = shapeProgress;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    shapeProgress,
  ]);

  return (
    <div
      ref={containerRef}
      className={`particles-container ${className || ''}`}
    />
  );
};

export default AnimatedContent;