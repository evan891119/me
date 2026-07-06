export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 7, 4]} intensity={1.25} />
      <pointLight position={[0, 2.7, 2.8]} intensity={3.2} distance={7} />
      <pointLight position={[-3, 2.2, -2]} intensity={1.3} distance={5} />
      <pointLight position={[3, 2.2, -2]} intensity={1.3} distance={5} />
    </>
  );
}
