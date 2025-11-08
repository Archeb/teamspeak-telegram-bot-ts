const BINDINGS_PATH = "./data/bindings.json";

interface Binding {
  tgId: number;
  tgDisplayName: string;
}

interface Bindings {
  [tsUid: string]: Binding;
}

let bindings: Bindings = {};

async function loadBindings() {
  try {
    const text = await Deno.readTextFile(BINDINGS_PATH);
    bindings = JSON.parse(text);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      await saveBindings();
    } else {
      console.error("Error loading bindings:", err);
    }
  }
}

async function saveBindings() {
  try {
    await Deno.writeTextFile(BINDINGS_PATH, JSON.stringify(bindings, null, 2));
  } catch (err) {
    console.error("Error saving bindings:", err);
  }
}

function getBinding(tsUid: string): Binding | undefined {
  return bindings[tsUid];
}

async function addBinding(tsUid: string, tgId: number, tgDisplayName: string) {
  bindings[tsUid] = { tgId, tgDisplayName };
  await saveBindings();
}

export { loadBindings, getBinding, addBinding, removeBindingByTgId };
export type { Binding };

async function removeBindingByTgId(tgId: number): Promise<boolean> {
  const tsUidToRemove = Object.keys(bindings).find(
    (tsUid) => bindings[tsUid].tgId === tgId,
  );
  if (tsUidToRemove) {
    delete bindings[tsUidToRemove];
    await saveBindings();
    return true;
  }
  return false;
}