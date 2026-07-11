import { useAppStore } from '../state/useAppStore';

export function SceneLighting() {
  const activeLocationId = useAppStore((state) => state.activeLocationId);

  return (
    <>
      <ambientLight intensity={0.62} />
      <hemisphereLight args={['#9abcc2', '#302b24', 0.8]} />
      <directionalLight position={[-12, 10, -20]} intensity={1.45} color="#f1c98e" />
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
