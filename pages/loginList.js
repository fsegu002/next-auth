import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

function LoginList({ logins }) {
  const list = logins.map((login, idx) => <li key={idx}>{login.lastLogin}</li>);
  return (
    <>
      <h3>My latest logins</h3>
      <ul>{list}</ul>
    </>
  );
}

LoginList.propType = {
  logins: PropTypes.array.isRequired
};
LoginList.defaultProps = {
  logins: []
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/logins/46`);
  const logins = await res.json();

  // Pass data to the page via props
  return { props: { logins } };
}

export default LoginList;
