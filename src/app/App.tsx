import { AppRouter } from './AppRouter';
import { RequestProgress } from './RequestProgress';
import { useTheme } from '@/shared/hooks/useTheme';
import { useKeyboardNavigation } from '@/shared/hooks/useKeyboardNavigation';
import { ToastContainer } from '@/shared/components/ui/Toast';

export default function App() {
  useTheme();
  useKeyboardNavigation();

  return (
    <>
      <RequestProgress />
      <ToastContainer />
      <AppRouter />
    </>
  );
}
