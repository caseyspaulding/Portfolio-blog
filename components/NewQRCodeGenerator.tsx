'use client';

import type { MutableRefObject} from "react";
import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { InputField } from "./InputField";
import { TextArea } from "./TextArea";
import { CheckboxField } from "./CheckboxField";
import { SelectField } from "./SelectField";
import { ImageUploadField } from "./ImageUploadField";
import { Button } from "@nextui-org/button";
import React from "react";

export default function NewQRCodeGenerator ()
{

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ state, setState ] = useState<{ [ key: string ]: any }>( {} );
  const ref = useRef<QRCode>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = ( { target }: any ) =>
  {
    setState( prevState => ( { ...prevState, [ target.name ]: target.value } ) )
  }

  const handleDownload = () =>
  {
    ref.current?.download()
  }

  const buildEyeRadiusInput = ( id: string ) =>
  {
    return <InputField
      name={ id }
      type='range'
      handleChange={ handleChange }
      min={ 0 }
      max={ 50 }
      hideLabel
      defaultValue={ ( state  )[ id ] }
    />
  };

  return (
    <>
      <div className='mx-auto max-w-7xl px-6 pb-2 sm:pt-14 lg:px-8 lg:pt-1'>
        <div className='app mt-10 flex justify-center items-center '>
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Free QR Code Generator
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          <div className="w-full p-4 space-y-8">


            <div className="w-full flex justify-center p-4">
              <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center border border-blue-600 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <QRCode
                  ref={ ref as MutableRefObject<QRCode> }
                  logoOnLoad={ ( e ) => console.log( 'logo loaded', e ) }
                  { ...{
                    ...state,
                    eyeRadius: [
                      {
                        outer: [ state.eyeradius_0_outer_0, state.eyeradius_0_outer_1, state.eyeradius_0_outer_2, state.eyeradius_0_outer_3 ],
                        inner: [ state.eyeradius_0_inner_0, state.eyeradius_0_inner_1, state.eyeradius_0_inner_2, state.eyeradius_0_inner_3 ],
                      },
                      {
                        outer: [ state.eyeradius_1_outer_0, state.eyeradius_1_outer_1, state.eyeradius_1_outer_2, state.eyeradius_1_outer_3 ],
                        inner: [ state.eyeradius_1_inner_0, state.eyeradius_1_inner_1, state.eyeradius_1_inner_2, state.eyeradius_1_inner_3 ],
                      },
                      {
                        outer: [ state.eyeradius_2_outer_0, state.eyeradius_2_outer_1, state.eyeradius_2_outer_2, state.eyeradius_2_outer_3 ],
                        inner: [ state.eyeradius_2_inner_0, state.eyeradius_2_inner_1, state.eyeradius_2_inner_2, state.eyeradius_2_inner_3 ],
                      },
                    ],
                    eyeColor: [
                      {
                        outer: state.eyecolor_0_outer ?? state.fgColor ?? '#000000',
                        inner: state.eyecolor_0_inner ?? state.fgColor ?? '#000000',
                      },
                      {
                        outer: state.eyecolor_1_outer ?? state.fgColor ?? '#000000',
                        inner: state.eyecolor_1_inner ?? state.fgColor ?? '#000000',
                      },
                      {
                        outer: state.eyecolor_2_outer ?? state.fgColor ?? '#000000',
                        inner: state.eyecolor_2_inner ?? state.fgColor ?? '#000000',
                      },
                    ],
                  } }
                />
                <Button
                  type="button"
                  onClick={ handleDownload }
                  className="mt-5 px-4 py-2  bg-yellow-300 text-blue-700 font-semibold rounded-3xl  hover:bg-yellow-400 "
                >
                  Download QR Code
                </Button>
              </div>

            </div>
            <div className="flex flex-col space-y-4">

              <TextArea
                name="value"
                label="Your Web Address"
                handleChange={ handleChange }
                placeholder="Enter your web address here that you would like to convert to a QR code"
              />
              <SelectField name="ecLevel" options={ [ 'L', 'M', 'Q', 'H' ] } handleChange={ handleChange } />
              <InputField name="size" type="range" handleChange={ handleChange } min={ 100 } max={ 500 } />
              <InputField name="quietZone" type="range" handleChange={ handleChange } min={ 20 } max={ 80 } />
              <div className="flex space-x-4">
                <InputField name="bgColor" type="color" defaultValue="#ffffff" handleChange={ handleChange } />
                <InputField name="fgColor" type="color" defaultValue="#000000" handleChange={ handleChange } />
              </div>
            </div>
            <div className="w-full  space-y-8">
              <div className="flex flex-col space-y-4">
                <p className="text-lg font-semibold">Eye Radius</p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Top left eye</p>
                    <p className="text-xs">Outer</p>
                    { buildEyeRadiusInput( 'eyeradius_0_outer_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_outer_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_outer_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_outer_3' ) }
                    <p className="text-xs">Inner</p>
                    { buildEyeRadiusInput( 'eyeradius_0_inner_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_inner_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_inner_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_0_inner_3' ) }
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Top right eye</p>
                    <p className="text-xs">Outer</p>
                    { buildEyeRadiusInput( 'eyeradius_1_outer_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_outer_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_outer_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_outer_3' ) }
                    <p className="text-xs">Inner</p>
                    { buildEyeRadiusInput( 'eyeradius_1_inner_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_inner_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_inner_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_1_inner_3' ) }
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Bottom left eye</p>
                    <p className="text-xs">Outer</p>
                    { buildEyeRadiusInput( 'eyeradius_2_outer_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_outer_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_outer_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_outer_3' ) }
                    <p className="text-xs">Inner</p>
                    { buildEyeRadiusInput( 'eyeradius_2_inner_0' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_inner_1' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_inner_2' ) }
                    { buildEyeRadiusInput( 'eyeradius_2_inner_3' ) }
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <p className="text-lg font-semibold">Eye Color</p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Top left eye</p>
                    <p className="text-xs">Outer</p>
                    <InputField
                      name="eyecolor_0_outer"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                    <p className="text-xs">Inner</p>
                    <InputField
                      name="eyecolor_0_inner"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Top right eye</p>
                    <p className="text-xs">Outer</p>
                    <InputField
                      name="eyecolor_1_outer"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                    <p className="text-xs">Inner</p>
                    <InputField
                      name="eyecolor_1_inner"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">Bottom left eye</p>
                    <p className="text-xs">Outer</p>
                    <InputField
                      name="eyecolor_2_outer"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                    <p className="text-xs">Inner</p>
                    <InputField
                      name="eyecolor_2_inner"
                      type="color"
                      defaultValue={ state.fgColor ?? '#000000' }
                      handleChange={ handleChange }
                      hideLabel={ true }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className=''>


            <div className='w-full  p-4'>
              <h2 className='text-2xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>Add Your Logo</h2>
              <div className='flex flex-col space-y-4'>
                <ImageUploadField
                  name="logoImage"  // This remains fixed for your app logic
                  label="Upload Logo"  // Custom label displayed instead of the name
                  handleChange={ handleChange }
                  hideName={ true }  // Hide the default name label
                />
                <InputField name='logoWidth' type='range' handleChange={ handleChange } min={ 20 } max={ 500 } />
                <InputField name='logoHeight' type='range' handleChange={ handleChange } min={ 20 } max={ 500 } />
                <InputField name='logoOpacity' type='range' handleChange={ handleChange } min={ 0 } max={ 1 } step={ 0.1 } defaultValue={ 1 } />
                <SelectField name='qrStyle' options={ [ 'squares', 'dots', 'fluid' ] } handleChange={ handleChange } />
                <CheckboxField name='removeQrCodeBehindLogo' handleChange={ handleChange } />
                <InputField name='logoPadding' type='range' handleChange={ handleChange } min={ 0 } max={ 20 } step={ 1 } defaultValue={ 0 } />
                <SelectField name='logoPaddingStyle' options={ [ 'square', 'circle' ] } handleChange={ handleChange } />
              </div>
            </div>
          </div>

        </div>
      </div>

    </>

  )
}