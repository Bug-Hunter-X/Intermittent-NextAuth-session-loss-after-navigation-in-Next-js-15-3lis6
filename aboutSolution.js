```javascript
// pages/aboutSolution.js
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context, authOptions);

  return {
    props: {
      session,
    },
  };
}

export default function About() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>About Page</h1>
      {session && (
        <div>
          <p>Logged in as {session.user.email}</p>
        </div>
      )}
      {status === 'unauthenticated' && <p>Please log in.</p>}
    </div>
  );
}
```