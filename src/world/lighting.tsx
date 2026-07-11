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
          <pointLight position={[0, 4.35, 7.4]} intensity={2.5} distance={8} color="#e8c58f" />
          <pointLight position={[0, 4.5, 1.7]} intensity={2.35} distance={9} color="#deb77e" />
          <pointLight position={[-5.5, 4.0, -2.4]} intensity={1.55} distance={7} color="#d5b17b" />
          <pointLight position={[5.5, 4.0, -2.4]} intensity={1.55} distance={7} color="#c9c394" />
        </>
      ) : null}
    </>
  );
}
