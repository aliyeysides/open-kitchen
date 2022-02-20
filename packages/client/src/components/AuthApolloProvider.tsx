import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import React, { FC } from "react";
import { useAuth0 } from "./Auth0Context";

interface Props {
    // any props that come into the component
}
const AuthorizedApolloProvider: FC<Props> = ({ children }) => {
    const { getTokenSilently } = useAuth0();

    const httpLink = createHttpLink({
        uri: "/graphql", // your URI here...
    });

    const authLink = setContext(async () => {
        const token = await getTokenSilently();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    });

    const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
