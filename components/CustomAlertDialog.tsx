
import React from 'react'
import
  {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
  } from '@/components/ui/alert-dialog'

const alertTypeStyles = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-orange-500',
  info: 'text-blue-600'
}

interface CustomAlertDialogProps
{
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  showCancel: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function CustomAlertDialog ( {
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  showCancel,
  type // Included the 'type' prop here
}: CustomAlertDialogProps )
{
  return (
    <AlertDialog open={ open } onOpenChange={ onOpenChange }>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={ alertTypeStyles[ type ] }>
            { title }
          </AlertDialogTitle>
          <AlertDialogDescription>{ description }</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          { showCancel && <AlertDialogCancel>Cancel</AlertDialogCancel> }
          <AlertDialogAction onClick={ onConfirm }>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
