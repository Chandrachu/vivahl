import React from 'react';
import styled from 'styled-components';

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Wishlist = () => {
  return (
    <WishlistContainer>
      <h1>Your Wishlist</h1>
      <p>Wishlist page - Coming soon!</p>
    </WishlistContainer>
  );
};

export default Wishlist;
