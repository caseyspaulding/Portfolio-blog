import { forwardRef, useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Import Loader2 icon from lucide-react

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    isLoading?: boolean;
    loadingMessage?: string;
    spinnerDelay?: number; // Delay in ms for hiding the spinner
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            isLoading = false,
            loadingMessage = "Loading...",
            spinnerDelay = 500,
            children,
            ...props
        },
        ref
    ) =>
    {
        const [ showSpinner, setShowSpinner ] = useState( isLoading );

        useEffect( () =>
        {
            let timer: NodeJS.Timeout;

            if ( isLoading )
            {
                // Show spinner immediately
                setShowSpinner( true );
            } else if ( !isLoading && showSpinner )
            {
                // Delay hiding spinner after loading ends
                timer = setTimeout( () => setShowSpinner( false ), spinnerDelay );
            }

            return () =>
            {
                if ( timer ) clearTimeout( timer );
            };
        }, [ isLoading, showSpinner, spinnerDelay ] );

        return (
            <button ref={ ref } { ...props } className={ `relative ${ props.className }` }>
                { showSpinner ? (
                    <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        { loadingMessage }
                    </>
                ) : (
                    children
                ) }
            </button>
        );
    }
);

MyButton.displayName = "MyButton";

export default MyButton;