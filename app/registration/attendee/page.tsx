import React from 'react';

const RegisterAttendee = () =>
{
  return (
    <form method="post" action="/api/auth/register-attendee">
      {/* Attendee specific registration fields */ }
      <input type="text" name="fullName" required placeholder="Full Name" />
      <input type="text" name="contactNumber" required placeholder="Contact Number" />
      {/* ... other fields ... */ }
      <button type="submit">Complete Registration</button>
    </form>
  );
};

export default RegisterAttendee;
