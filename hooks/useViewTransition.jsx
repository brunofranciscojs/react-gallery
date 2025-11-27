import { useNavigate } from 'react-router-dom';

export function useViewTransition() {
  const navigate = useNavigate();

  const transitionTo = (path) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(path);
      });
    } else {
      navigate(path);
    }
  };

  return { transitionTo };
}