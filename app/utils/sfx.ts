// Web Audio API Native Synthesizer (Zero Latency, No External Assets Needed)

export const playPopSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1080, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore in non-browser env
  }
};

export const playChimeSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.6);
    });
  } catch (e) {}
};

export const playSizzlingSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {}
};

export const playStampSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {}
};

export const playBusHornSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = "sawtooth";
    osc2.type = "sawtooth";
    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc2.frequency.setValueAtTime(380, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.7);
    osc2.stop(ctx.currentTime + 0.7);
  } catch (e) {}
};

export const playPortalHumSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
};

export const playPortalWarpSFX = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    // 1. Deep cosmic bass sweep
    const oscBass = ctx.createOscillator();
    const gainBass = ctx.createGain();
    oscBass.type = "sawtooth";
    oscBass.frequency.setValueAtTime(80, ctx.currentTime);
    oscBass.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.6);
    oscBass.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 1.2);
    gainBass.gain.setValueAtTime(0.22, ctx.currentTime);
    gainBass.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    // 2. Resonant high starlight chime sweep
    const oscChime = ctx.createOscillator();
    const gainChime = ctx.createGain();
    oscChime.type = "triangle";
    oscChime.frequency.setValueAtTime(440, ctx.currentTime);
    oscChime.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.5);
    oscChime.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.1);
    gainChime.gain.setValueAtTime(0.15, ctx.currentTime);
    gainChime.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + 0.5);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);

    oscBass.connect(filter);
    oscChime.connect(filter);
    filter.connect(gainBass);
    filter.connect(gainChime);
    gainBass.connect(ctx.destination);
    gainChime.connect(ctx.destination);

    oscBass.start();
    oscChime.start();
    oscBass.stop(ctx.currentTime + 1.2);
    oscChime.stop(ctx.currentTime + 1.2);
  } catch (e) {}
};

