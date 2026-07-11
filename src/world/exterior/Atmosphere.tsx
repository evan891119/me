import { BackSide, Color, ShaderMaterial } from 'three';

interface SkylineBlock {
  color: string;
  position: [number, number, number];
  scale: [number, number, number];
}

const skylineBlocks: SkylineBlock[] = [
  { color: '#222a2d', position: [-14.5, 1.7, 30.6], scale: [1.8, 3.4, 0.18] },
  { color: '#253033', position: [-11.7, 1.15, 30.8], scale: [1.5, 2.3, 0.18] },
  { color: '#1f272a', position: [-8.9, 2.0, 30.9], scale: [1.3, 4.0, 0.18] },
  { color: '#293336', position: [-6.2, 1.35, 30.75], scale: [1.8, 2.7, 0.18] },
  { color: '#222a2d', position: [6.2, 1.25, 30.9], scale: [1.6, 2.5, 0.18] },
  { color: '#263033', position: [8.9, 1.85, 30.7], scale: [1.4, 3.7, 0.18] },
  { color: '#20282b', position: [11.7, 1.1, 30.85], scale: [1.8, 2.2, 0.18] },
  { color: '#283235', position: [14.5, 1.55, 30.65], scale: [1.5, 3.1, 0.18] },
];

const skyMaterial = new ShaderMaterial({
  depthWrite: false,
  side: BackSide,
  uniforms: {
    horizonColor: { value: new Color('#76564f') },
    middleColor: { value: new Color('#39454a') },
    zenithColor: { value: new Color('#202b31') },
  },
  vertexShader: `
    varying float vHeight;

    void main() {
      vHeight = normalize(position).y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 horizonColor;
    uniform vec3 middleColor;
    uniform vec3 zenithColor;
    varying float vHeight;

    void main() {
      float lowerMix = smoothstep(-0.08, 0.22, vHeight);
      float upperMix = smoothstep(0.18, 0.72, vHeight);
      vec3 lowerSky = mix(horizonColor, middleColor, lowerMix);
      vec3 color = mix(lowerSky, zenithColor, upperMix);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

export function Atmosphere() {
  return (
    <group>
      <mesh position={[0, 5, 9.5]} scale={[60, 24, 60]}>
        <sphereGeometry args={[1, 32, 16]} />
        <primitive object={skyMaterial} attach="material" />
      </mesh>

      <mesh position={[0, 0.65, 31.2]} scale={[40, 1.3, 0.12]}>
        <boxGeometry />
        <meshBasicMaterial color="#1c2425" />
      </mesh>

      {skylineBlocks.map((block, index) => (
        <mesh key={`skyline-${index}`} position={block.position} scale={block.scale}>
          <boxGeometry />
          <meshBasicMaterial color={block.color} />
        </mesh>
      ))}
    </group>
  );
}
