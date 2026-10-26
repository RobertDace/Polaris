export type ActId = 1 | 2 | 3 | 4 | 5 | "what-if";

type EventCallback<T = any> = (data: T) => void;

class WorldBridge {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  on<T = any>(event: string, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => this.off(event, callback);
  }

  off(event: string, callback: EventCallback): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(callback);
      if (set.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit<T = any>(event: string, data?: T): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[WorldBridge] Error in listener for ${event}:`, err);
        }
      });
    }
  }

  // Helper convenience methods
  setAct(act: ActId) {
    this.emit("act:change", act);
  }

  setCooking(isCooking: boolean, ingredients: string[]) {
    this.emit("cooking:state", { isCooking, ingredients });
  }

  setConflictPerspective(mode: "fear" | "grit") {
    this.emit("conflict:perspective", mode);
  }

  setWarp(isWarping: boolean, factor: number = 1.0) {
    this.emit("warp:state", { isWarping, factor });
  }

  setWhatIf(isHolding: boolean) {
    this.emit("whatif:state", isHolding);
  }

  requestScrollTo(actNumber: number) {
    this.emit("scroll:request", actNumber);
  }
}

export const worldBridge = new WorldBridge();
