import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BookingFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BookingForm = () => {
  const { vendorId } = useParams();

  return (
    <BookingFormContainer>
      <h1>Book Vendor {vendorId}</h1>
      <p>Booking form - Coming soon!</p>
    </BookingFormContainer>
  );
};

export default BookingForm;
