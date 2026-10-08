export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Some browser permissions disallow the Clipboard API but allow selection copy.
    }
  }
  const previousFocus = document.activeElement;
  const selection = document.createElement("textarea");
  selection.value = text;
  selection.setAttribute("readonly", "");
  selection.style.position = "fixed";
  selection.style.left = "-9999px";
  document.body.appendChild(selection);
  try {
    selection.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    selection.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }
}
