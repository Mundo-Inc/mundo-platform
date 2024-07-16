import type { Cell } from "@tanstack/react-table";

export function copyCellValueToClipboard(cell: Cell<any, unknown>) {
  const value = cell.getValue() as string;
  navigator.clipboard.writeText(value);
  const element = document.getElementById(value);

  if (element) {
    element.classList.add("text-green-600");
    setTimeout(() => {
      element.classList.remove("text-green-600");
    }, 500);
  }
}
