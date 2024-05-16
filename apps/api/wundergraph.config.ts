import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates
} from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/'
});

configureWunderGraphApplication({
  apis: [countries],
  server,
  operations,
  generate: {
    codeGenerators: [
      {
        templates: [templates.typescript.client],
        path: '../../packages/generated-wundergraph'
      }
    ],
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
          "https://flywunder.vercel.app",
        ]
        : [
          "http://localhost:3000",
          new EnvironmentVariable("WG_ALLOWED_ORIGIN"),
        ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== "production" ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  }
});
