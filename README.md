# Chop Room

A browser sampler with independent 16-pad MPCs, a digit-mapped sample keyboard, held-key effects, and layered loop recording.

## Play

- Pads: A S D F / G H J K / Z X C V / B N M ,
- Pitched selected chop: digits 0–8
- Hold Shift for repeat, Q for low pass, W for echo, E for drive
- Space starts/stops loops; R records or overdubs
- Export the loop as a stereo WAV

Paste a YouTube link to map its full duration to 16 pads immediately. Each pad jumps to a separate video section. Direct YouTube playback may buffer and supports one section at a time per MPC. Pitching, performance FX, and WAV export require captured audio. In desktop Chrome or Edge, use Record & chop tab with Share tab audio enabled; recording finishes automatically after 8, 16, or 32 seconds of incoming sound and trims edge silence. This is not an automatic YouTube downloader. Local audio files can also be loaded. Samples and loop events remain in browser memory and are cleared on reload.

## Develop

No dependencies or build step:

```sh
python3 -m http.server 4173 --directory docs
node --check docs/app.js
```

## Deploy

GitHub Pages publishes the `docs/` folder on `main`. Push source changes to this repository and wait for the Pages build to succeed. GitHub Pages is the user's selected hosting provider.
