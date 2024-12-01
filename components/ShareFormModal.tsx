"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import
{
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share, Copy, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"// Adjusted import path for useToast
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import
{
  faFacebook,
  faWhatsapp,
  faFacebookMessenger,
  faXTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

interface ShareFormModalProps
{
  form: any;
  orgId: string;
}

export default function ShareFormModal ( { form, orgId }: ShareFormModalProps )
{
  const [ isOpen, setIsOpen ] = useState( false );
  const [ shareUrl, setShareUrl ] = useState( '' );
  const { toast } = useToast(); // Use the toast hook from your custom path

  useEffect( () =>
  {
    if ( form.id )
    {
      const url = `${ window.location.origin }/forms/${ orgId }/${ form.id }`;
      setShareUrl( url );
    } else
    {
      setShareUrl( '' );
    }
  }, [ form.id, orgId ] );

  const copyToClipboard = () =>
  {
    navigator.clipboard.writeText( shareUrl )
      .then( () =>
      {
        toast( {
          description: "Form share link copied to clipboard.",
        } );
      } )
      .catch( ( err ) => console.error( 'Failed to copy: ', err ) );
  };

  const shareButtons = [
    {
      name: 'Email',
      icon: EnvelopeOpenIcon,
      url: `mailto:?subject=Please fill out this form&body=${ encodeURIComponent(
        `Please fill out this form: ${ shareUrl }`
      ) }`,
    },
    {
      name: 'WhatsApp',
      icon: faWhatsapp,
      url: `https://wa.me/?text=${ encodeURIComponent(
        `Please fill out this form: ${ shareUrl }`
      ) }`,
    },
    {
      name: 'Messenger',
      icon: faFacebookMessenger,
      url: `https://www.facebook.com/dialog/send?link=${ encodeURIComponent(
        shareUrl
      ) }&redirect_uri=${ encodeURIComponent( shareUrl ) }&app_id=2283279935382121`,
    },
    {
      name: 'Facebook',
      icon: faFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent(
        shareUrl
      ) }&quote=${ encodeURIComponent( 'Please fill out this form' ) }`,
    },
    {
      name: 'X',
      icon: faXTwitter,
      url: `https://x.com/intent/tweet?text=${ encodeURIComponent(
        `Please fill out this form: ${ shareUrl }`
      ) }`,
    },
  ];

  return (
    <>
      <Button
        variant="outline"
        onClick={ () => setIsOpen( true ) }

        className="flex items-center bg-white space-x-2  border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
      >
        <Share2 className="h-4 w-4" />
        <span>Share Form</span>
      </Button>
      <Dialog open={ isOpen } onOpenChange={ setIsOpen }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Notice</DialogTitle>
          </DialogHeader>
          { !form.id ? (
            <div className="p-4">
              <p>Please save the form before sharing.</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Input value={ shareUrl } readOnly className="flex-grow" />
                <Button variant="outline" size="icon" onClick={ copyToClipboard }>
                  <span className="sr-only">Copy link</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                { shareButtons.map( ( button ) => (
                  <a
                    key={ button.name }
                    href={ button.url }
                    onClick={ ( e ) =>
                    {
                      e.preventDefault();
                      window.open(
                        button.url,
                        '_blank',
                        'width=600,height=600,toolbar=0,menubar=0'
                      );
                    } }
                    aria-label={ `Share on ${ button.name }` }
                  >
                    { typeof button.icon === 'string' ? (
                      <Image
                        src={ button.icon }
                        alt={ `${ button.name } icon` }
                        width={ 24 }
                        height={ 24 }
                      />
                    ) : button.icon === EnvelopeOpenIcon ? (
                      <button.icon className="w-6 h-6  text-blue-500" />
                    ) : (
                      <FontAwesomeIcon
                        icon={ button.icon as IconDefinition }
                        size="lg"
                        color="#2563eb"
                      />
                    ) }
                  </a>
                ) ) }
              </div>
            </div>
          ) }
        </DialogContent>
      </Dialog>
    </>
  );
}
