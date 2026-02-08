import { z } from "zod";

// Simple test tools to verify Tambo SDK integration
// Using 'any' type to bypass TypeScript errors temporarily
export const testTools: any = [
    {
        name: "hello_world",
        description: "A simple test tool that returns a greeting. Try saying 'hello' or 'test connection'",
        tool: async (params: { name?: string }) => {
            console.log("[Test Tool] hello_world called with:", params);
            return {
                message: `Hello ${params.name || 'World'}! The GitHub Explorer is working correctly. ✅`,
                timestamp: new Date().toISOString(),
                status: "success"
            };
        },
        inputSchema: z.object({
            name: z.string().optional().describe("Your name (optional)")
        }),
        outputSchema: z.object({
            message: z.string(),
            timestamp: z.string(),
            status: z.string()
        }),
    }
];
