import { useAppStore } from '../state/useAppStore';

export function SceneLighting() {
  const activeLocationId = useAppStore((state) => state.activeLocationId);

  return (
    <>
      <ambientLight intensity={0.58} />
      <hemisphereLight args={['#7c8988', '#28251f', 0.72]} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} color="#dfbd8e" />
      {activeLocationId === 'interior' ? (
        <>
          <pointLight position={[0, 2.7, 2.8]} intensity={3.2} distance={7} />
          <pointLight position={[-3, 2.2, -2]} intensity={1.3} distance={5} />
          <pointLight position={[3, 2.2, -2]} intensity={1.3} distance={5} />
        </>
      ) : null}
    </>
  );
}
