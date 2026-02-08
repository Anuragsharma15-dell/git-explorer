# Flux GitHub Explorer - Demo Walkthrough Script

This script outlines the flow for a 2-3 minute demo video showcasing the Flux GitHub Explorer project. Follow these steps to record a professional walkthrough.

## **Preparation**
1.  **Ensure Server is Running**: Run `pnpm dev` in your terminal.
2.  **Open Browser**: Navigate to `http://localhost:3000`.
3.  **Clear Cache**: Use an Incognito/Private window for a fresh start so animations play correctly.
4.  **Zoom**: Set browser zoom to 100% or slightly higher (110%) for clarity.

---

## **Scene 1: The Landing Page (0:00 - 0:45)**

**Action:**
- Start at the top of the Landing Page.
- Slowly scroll down.
- **Pause** at the "Master your repos conversationally" headline.
- continue scrolling to the "Powerful Features" grid. Hover over the cards to show the hover effects.
- Scroll past the "How It Works" steps.
- **Pause** at the "MCP Configuration" section showing the screenshots.
- Finally, click the large "Start Chatting" button at the bottom (or in the navbar).

**Voiceover / Narrative:**
> "Welcome to Flux, the AI-powered GitHub Explorer designed to give you superhuman insights into your codebase.
> 
> Flux replaces manual browsing with intelligent conversation. It features a stunning, modern interface built with Next.js and Tailwind CSS, offering a premium user experience from the moment you land.
> 
> With deep analysis tools, issue triage assistance, and PR tracking, Flux transforms how you interact with repositories. It connects securely to your GitHub account via the Model Context Protocol (MCP), ensuring your data remains private and under your control."

---

## **Scene 2: The Chat Interface & Analysis (0:45 - 1:30)**

**Action:**
- You are now on the `/chat` page.
- In the input box, type: 
  > *"Analyze the facebook/react repository"*
- Press **Enter**.
- **Wait** for the response. Point out the streaming text and the **Repository Analysis Component** that appears.
- Hover over the "Health Score" gauge and the activity graph.

**Voiceover / Narrative:**
> "Let's see Flux in action. I'll ask it to analyze the React repository.
> 
> Notice how Flux doesn't just give text; it generates a rich, interactive dashboard. Here we see a Health Score calculated in real-time based on commit activity and issue counts. We also get a visual breakdown of languages and a commit activity graph—all generated on the fly by the AI."

---

## **Scene 3: Specific Insights & Tools (1:30 - 2:15)**

**Action:**
- In the chat input, type:
  > *"Show me the top 5 open bugs in vercel/next.js"*
- Press **Enter**.
- **Wait** for the `IssueCard` grid to appear.
- Hover over a few issue cards.
- Mention the labels and clear layout.

**Voiceover / Narrative:**
> "Flux isn't limited to summaries. It can drill down into specific data.
> 
> Here, I'm asking for open bugs in the Next.js repo. Flux intelligently selects the `IssueCard` component to display this list in a clean, Kanban-style grid. This makes triage incredibly fast compared to wading through GitHub's default list view."

---

## **Scene 4: MCP Configuration & Conclusion (2:15 - End)**

**Action:**
- Click the **Plug Icon** (MCP Config) in the chat toolbar (bottom left of input).
- Show the modal that pops up.
- Briefly point to the server list or "Add Server" form.
- Close the modal.
- Return to the chat view.

**Voiceover / Narrative:**
> "Under the hood, Flux is powered by the Model Context Protocol. You can easily configure and connect your own local or remote MCP servers right from this modal, extending Flux's capabilities to any tool or dataset you need.
> 
> This is Flux: Beautiful, Intelligent, and Extensible. The future of repository management."

---

## **Recording Tips**
- **Mouse Movement**: Keep mouse movements smooth and deliberate. Avoid jittery cursor motions.
- **Typing**: Type at a steady pace, or copy-paste the prompts to avoid typos.
- **Patience**: Let the AI response finish streaming completely before moving to the next action.
