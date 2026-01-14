// Simple debug component to verify React is rendering
export const DebugInfo = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
      <h2>Debug Info</h2>
      <p>If you see this, React is rendering!</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  );
};
