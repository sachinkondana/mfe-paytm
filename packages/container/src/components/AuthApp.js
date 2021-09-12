import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      location: history.location,
      onNavigate: ({ pathname: nextPathname }) => {
        console.log('The container noticed navigation in Marketing!', nextPathname);
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });

    if (onParentNavigate) {
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
