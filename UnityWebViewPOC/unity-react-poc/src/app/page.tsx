import TestDisplay from '@/components/TestDisplay';
import UnityLoader from '@/components/UnityLoader';

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div id="unity-container" style={{
        flex: 1,
        position: 'relative',
        minWidth: '800px',
        minHeight: '600px',
        background: '#444'
      }}>
        <UnityLoader />
      </div>
      <div className="w-80 bg-gray-50 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
        <TestDisplay />
      </div>
    </main>
  );
}