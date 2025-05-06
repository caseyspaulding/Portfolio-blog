import { Spinner } from "flowbite-react";
import { forwardRef, useEffect, useState } from "react";


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
                        <Spinner className="animate-spin mr-2" size="sm" />
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
