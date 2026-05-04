import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Navbar } from './components/Navbar';

// Lazy loading de páginas (bonus)
const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const BoardPage = lazy(() =>
  import('./pages/BoardPage').then((m) => ({ default: m.BoardPage }))
);
const StatsPage = lazy(() =>
  import('./pages/StatsPage').then((m) => ({ default: m.StatsPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="min-h-screen bg-slate-900 text-white">
          <Navbar />
          <main>
            <Suspense fallback={<PageSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}
