import Head from 'next/head';
import { Calculator, PageContainer } from 'src/components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer>
          <Calculator />
        </PageContainer>
      </main>
    </>
  );
}
