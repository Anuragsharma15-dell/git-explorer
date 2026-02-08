
const fs = require('node:fs');
const path = require('node:path');

// Read .env file manually
const envPath = path.resolve(process.cwd(), '.env');
const env = {};
if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.replace(/\r\n/g, '\n').split('\n').filter(line => line.trim() && !line.startsWith('#')).forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let val = parts.slice(1).join('=').trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            env[key] = val;
        }
    });
}

const API_KEY = process.env.NEXT_PUBLIC_TAMBO_API_KEY || env.NEXT_PUBLIC_TAMBO_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_TAMBO_URL || env.NEXT_PUBLIC_TAMBO_URL || "https://api.tambo.co";

if (!API_KEY) {
    console.error("No API Key found in .env");
    process.exit(1);
}

console.log(`Using API URL: ${API_URL}`);
console.log(`Using API Key: ${API_KEY.substring(0, 10)}... (length: ${API_KEY.length})`);

async function testStream() {
    const url = `${API_URL}/threads/advancestream`;

    const payload = {
        messageToAppend: {
            content: [{ type: "text", text: "Hello, this is a test message." }],
            role: "user",
            additionalContext: {}
        },
        contextKey: "github-explorer-v2", // Matches the context key in chat-interface.tsx
        availableComponents: [],
        clientTools: [],
        forceToolChoice: undefined,
        toolCallCounts: {}
    };

    console.log(`POST ${url}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY, // Changed to x-api-key based on SDK source
                "Accept": "text/event-stream"
            },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const headers = {};
        for (const [k, v] of response.headers.entries()) {
            headers[k] = v;
        }
        console.log(`Headers:`, headers);

        if (!response.ok) {
            console.error("Response not OK");
            try {
                const text = await response.text();
                console.error("Body:", text);
            } catch (e) {
                console.error("Failed to read error body:", e);
            }
            return;
        }

        if (!response.body) {
            console.error("No response body");
            return;
        }

        // Check if body has getReader
        if (response.body.getReader) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Stream complete");
                    break;
                }
                const chunk = decoder.decode(value, { stream: true });
                console.log("Received chunk:", chunk);
            }
        } else {
            // Fallback for node stream (Node 18 native fetch uses web streams usually, but just in case)
            console.log("Using node stream iterator...");
            for await (const chunk of response.body) {
                console.log("Received chunk:", chunk.toString());
            }
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testStream();
