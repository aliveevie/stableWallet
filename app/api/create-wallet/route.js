export async function GET(req, res) {
        console.log("Server is Working!");
        return new Response(JSON.stringify({ message: "Server is Working!" }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
}


export async function Post(req){
        console.log(req.body)
}
      