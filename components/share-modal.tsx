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
import { Share, Copy } from 'lucide-react';
import Image from 'next/image';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp, faFacebookMessenger, IconDefinition, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

interface ShareModalProps
{
  eventName: string;
}

export default function ShareModal ( { eventName }: ShareModalProps )
{
  const [ isOpen, setIsOpen ] = useState( false );
  const [ currentUrl, setCurrentUrl ] = useState( '' );

  useEffect( () =>
  {
    setCurrentUrl( window.location.href );
  }, [] );

  const copyToClipboard = () =>
  {
    navigator.clipboard.writeText( currentUrl )
      .then( () => alert( 'URL copied to clipboard!' ) )
      .catch( ( err ) => console.error( 'Failed to copy: ', err ) );
  };

  const shareButtons = [
    { name: 'Email', icon: EnvelopeOpenIcon, url: `mailto:?subject=Join me at ${ encodeURIComponent( eventName ) }&body=${ encodeURIComponent( `Join me at ${ eventName }: ${ currentUrl }` ) }` },
    { name: 'WhatsApp', icon: faWhatsapp, url: `https://wa.me/?text=${ encodeURIComponent( `Join me at ${ eventName }: ${ currentUrl }` ) }` },
    {
      name: 'Messenger',
      icon: faFacebookMessenger,
      url: `https://www.facebook.com/dialog/send?link=${ encodeURIComponent(
        currentUrl
      ) }&redirect_uri=${ encodeURIComponent(
        currentUrl
      ) }&app_id=2283279935382121`,
    },
    { name: 'Facebook', icon: faFacebook, url: `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent( currentUrl ) }&quote=${ encodeURIComponent( `Join me at ${ eventName }` ) }` },
    { name: 'X', icon: faXTwitter, url: `https://x.com/intent/tweet?text=${ encodeURIComponent( `Join me at ${ eventName }: ${ currentUrl }` ) }` },
  ];

  return (
    <>
      <button
        onClick={ () => setIsOpen( true ) }
        className="flex items-center space-x-2 border border-blue-600 text-blue-600 px-24 my-2  py-2 rounded-lg hover:bg-blue-50 transition"
      >
        <Share className="h-4 w-4" />
        <span>Share Event</span>
      </button>
      <Dialog open={ isOpen } onOpenChange={ setIsOpen }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Share this event</DialogTitle>
          </DialogHeader>
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-bold">Join me at { eventName }</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={ currentUrl } readOnly className="flex-grow" />
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
                    <button.icon className="w-6 h-6 text-blue-500" />
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
        </DialogContent>
      </Dialog>
    </>
  );
}
