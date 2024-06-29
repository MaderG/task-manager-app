import { Code, chakra, Spinner } from '@chakra-ui/react';

function PageRenderer({ children, emptyState, error, loading }) {
  if (error) {
    return <Code>{error}</Code>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {emptyState ? (
        <chakra.h1 maxH='10px' textAlign="center" fontSize="4xl" fontWeight="bold">
          {emptyState}
        </chakra.h1>
      ) : null}
      {children}
    </>
  );
}

export default function Page({ children, error, emptyState, loading }) {
  return (
    <PageRenderer error={error} loading={loading} emptyState={emptyState}>
      {children}
    </PageRenderer>
  );
}
