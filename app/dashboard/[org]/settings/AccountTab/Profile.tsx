// app/settings/AccountTab/Profile.js
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, User } from 'lucide-react';

export default function Profile ()
{
  const [ formData, setFormData ] = useState( {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  } );

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const { name, value } = e.target;
    setFormData( { ...formData, [ name ]: value } );
  };

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) =>
  {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log( 'Profile updated:', formData );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <form onSubmit={ handleSubmit } className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={ formData.firstName }
            onChange={ handleChange }
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={ formData.lastName }
            onChange={ handleChange }
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              className="pl-10"
              value={ formData.email }
              onChange={ handleChange }
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="username"
              name="username"
              className="pl-10"
              value={ formData.username }
              onChange={ handleChange }
              placeholder="Enter your username"
            />
          </div>
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
