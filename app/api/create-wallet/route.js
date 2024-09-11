// app/api/create-wallet/route.js

export async function POST(req) {
        try {
          const body = await req.json();
          const { name, countryCode, credential } = body;
      
          console.log('Received Data:', { name, countryCode, credential });
      
          return new Response(
            JSON.stringify({ message: 'Wallet created successfully!' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        } catch (error) {
          console.error('Error processing request:', error);
      
          return new Response(
            JSON.stringify({ message: 'Error creating wallet' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
}      