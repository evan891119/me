import { BackSide, Color, ShaderMaterial } from 'three';

interface SkylineBlock {
  color: string;
  position: [number, number, number];
  scale: [number, number, number];
}

const skylineBlocks: SkylineBlock[] = [
  { color: '#435356', position: [-14.5, 1.7, 30.6], scale: [1.8, 3.4, 0.18] },
  { color: '#4a5b5d', position: [-11.7, 1.15, 30.8], scale: [1.5, 2.3, 0.18] },
  { color: '#3f4f52', position: [-8.9, 2.0, 30.9], scale: [1.3, 4.0, 0.18] },
  { color: '#4e5e60', position: [-6.2, 1.35, 30.75], scale: [1.8, 2.7, 0.18] },
  { color: '#435356', position: [6.2, 1.25, 30.9], scale: [1.6, 2.5, 0.18] },
  { color: '#495a5d', position: [8.9, 1.85, 30.7], scale: [1.4, 3.7, 0.18] },
  { color: '#405053', position: [11.7, 1.1, 30.85], scale: [1.8, 2.2, 0.18] },
  { color: '#4c5c5f', position: [14.5, 1.55, 30.65], scale: [1.5, 3.1, 0.18] },
];

const skyMaterial = new ShaderMaterial({
  depthWrite: false,
  side: BackSide,
  uniforms: {
    cloudColor: { value: new Color('#e7e4d7') },
    horizonColor: { value: new Color('#d69b72') },
    middleColor: { value: new Color('#7fa8ae') },
    sunColor: { value: new Color('#ffe0a1') },
    zenithColor: { value: new Color('#3e6f82') },
  },
  vertexShader: `
    varying vec3 vDirection;

    void main() {
      vDirection = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 cloudColor;
    uniform vec3 horizonColor;
    uniform vec3 middleColor;
    uniform vec3 sunColor;
    uniform vec3 zenithColor;
    varying vec3 vDirection;

    void main() {
      vec3 direction = normalize(vDirection);
      float height = direction.y;
      float lowerMix = smoothstep(-0.1, 0.24, height);
      float upperMix = smoothstep(0.16, 0.78, height);
      vec3 lowerSky = mix(horizonColor, middleColor, lowerMix);
      vec3 color = mix(lowerSky, zenithColor, upperMix);

      vec3 sunDirection = normalize(vec3(-0.38, 0.24, -0.89));
      float sunAlignment = dot(direction, sunDirection);
      float sunGlow = smoothstep(0.91, 0.998, sunAlignment);
      float sunDisc = smoothstep(0.998, 0.9994, sunAlignment);
      color = mix(color, sunColor, sunGlow * 0.34);
      color = mix(color, sunColor, sunDisc);

      float azimuth = atan(direction.z, direction.x);
      float cloudNoise = 0.5;
      cloudNoise += sin(azimuth * 7.0 + height * 24.0) * 0.23;
      cloudNoise += sin(azimuth * 13.0 - height * 17.0 + 1.7) * 0.17;
      cloudNoise += sin(azimuth * 23.0 + height * 31.0 + 0.6) * 0.1;
      float cloudBand = smoothstep(0.1, 0.22, height) * (1.0 - smoothstep(0.56, 0.76, height));
      float cloudMask = smoothstep(0.63, 0.82, cloudNoise) * cloudBand;
      vec3 litCloud = mix(cloudColor, sunColor, sunGlow * 0.38);
      color = mix(color, litCloud, cloudMask * 0.42);

      gl_FragColor = vec4(color, 1.0);
    }
  `,
});

export function Atmosphere() {
  return (
    <group>
      <mesh position={[0, 3, 9.5]} scale={[70, 45, 70]}>
        <sphereGeometry args={[1, 48, 24]} />
        <primitive object={skyMaterial} attach="material" />
      </mesh>

      <mesh position={[0, 0.65, 31.2]} scale={[40, 1.3, 0.12]}>
        <boxGeometry />
        <meshBasicMaterial color="#526164" />
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
