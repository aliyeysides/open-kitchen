import { FC } from 'react';
import { ComponentType, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NotAuthorized from '../../pages/NotAuthorized';

export interface WithRoleBasedRedirectOptions {
  role: string;
}

const roleClaimType = `${process.env.REACT_APP_ROLE_CLAIM_URL}/roles`;

export const withRoleBasedRedirect =
  <P extends object>(
    Component: ComponentType<P>,
    options: WithRoleBasedRedirectOptions,
  ): FC<P> =>
  (props: P): JSX.Element => {
    const { getIdTokenClaims } = useAuth0();
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
      async function getRoles(): Promise<Array<string>> {
        const claims = await getIdTokenClaims();
        if (claims === undefined) {
          return [];
        }
        return claims[roleClaimType] || [];
      }

      async function checkRoles(role: string) {
        const roles = await getRoles();
        const isAuthorized = roles.includes(role);
        if (!isAuthorized) {
          console.log('NOT AUTHORIZED;');
        } else {
          setIsAuthorized(true);
        }
      }
      checkRoles(options.role);
    }, [getIdTokenClaims]);

    // add a nicer page or component to tell people they don't have access to the beta-test
    // or <Redirect to='/not-authorized'/, but then you need a component
    return isAuthorized ? <Component {...props} /> : <NotAuthorized />;
  };
