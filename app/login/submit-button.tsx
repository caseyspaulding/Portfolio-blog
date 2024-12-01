import { forwardRef, useEffect, useState } from "react";
import { Spinner, Ripple, useRipple } from "@nextui-org/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    isLoading?: boolean;
    loadingMessage?: string;
    spinnerDelay?: number; // New prop to specify the delay duration in milliseconds
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

        // Hook to manage ripple
        const { ripples, onClick, onClear } = useRipple();

        useEffect( () =>
        {
            let timer: NodeJS.Timeout;

            if ( isLoading )
            {
                setShowSpinner( true ); // Show spinner immediately when loading starts
            } else if ( !isLoading && showSpinner )
            {
                // Delay hiding spinner after loading is done
                timer = setTimeout( () => setShowSpinner( false ), spinnerDelay );
            }

            return () =>
            {
                if ( timer ) clearTimeout( timer ); // Clear timeout if the component is unmounted
            };
        }, [ isLoading, spinnerDelay ] );

        return (
            <button
                ref={ ref }
                { ...props }
                className={ `relative overflow-hidden ${ props.className }` }
                onClick={ ( event ) =>
                {
                    onClick( event ); // Trigger ripple on click
                    if ( props.onClick ) props.onClick( event ); // Call any passed onClick handler
                } }
            >
                { showSpinner ? (
                    <>
                        <Spinner className="animate-spin mr-2" size="sm" />
                        { loadingMessage }
                    </>
                ) : (
                    children
                ) }
                {/* Ripple effect */ }
                <Ripple ripples={ ripples } onClear={ onClear } />
            </button>
        );
    }
);

MyButton.displayName = "MyButton";

export default MyButton;
