// app/api/n8n-mealmatch/route.js

export async function POST(req) {
  try {
    const body = await req.json();

    // Forward request to local n8n webhook
    const n8nUrl = "http://127.0.0.1:5678/webhook-test/mealmatch";

    const response = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
