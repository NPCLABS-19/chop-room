# Chop Room
<!-- impeccable:product-schema 1 -->
## Platform
web
## Purpose
An online MPC instrument for pasting a YouTube link, chopping samples across pads, adding multiple instruments, pitching a selected chop with digits 0–8, playing held-key effects, and making loops.
## Capabilities and constraints
User confirmed the proposed instrument defaults and specified a paste-link flow. Each instrument has 16 pads. Live record, overdub, BPM, loop length, and quantization were proposed and accepted. YouTube raw audio is not exposed by its player API: implement explicit browser tab-audio capture, with a local file alternative. Capture requires a compatible browser and user selection of a tab with audio sharing enabled. This limitation was disclosed in chat.
## Assumptions
Primary audience: musicians experimenting in a desktop browser. No account or project persistence requested. Stack chosen by implementer: static HTML/CSS/JavaScript, Web Audio. Visual direction inferred for a focused performance surface.
