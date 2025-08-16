import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const VendorProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const VendorProfile = () => {
  const { id } = useParams();

  return (
    <VendorProfileContainer>
      <h1>Vendor Profile {id}</h1>
      <p>Vendor profile page - Coming soon!</p>
    </VendorProfileContainer>
  );
};

export default VendorProfile;
