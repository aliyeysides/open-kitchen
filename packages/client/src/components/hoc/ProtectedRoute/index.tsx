import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ComponentType } from 'react';

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component);

  return <Component />;
};

export default ProtectedRoute;
