import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-black text-slate-700 select-none">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Página no encontrada</h1>
      <p className="mt-2 text-slate-400">La ruta que buscas no existe.</p>
      <Link to="/" className="mt-8">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
