import { useSnackbar } from 'notistack';

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  function showToast(message: string, variant: 'success' | 'error' | 'warning' | 'info') {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      preventDuplicate: true,
    });
  }

  return { showToast };
}
