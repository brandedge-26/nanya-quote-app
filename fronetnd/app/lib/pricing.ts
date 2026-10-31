import { accessories, accessoryPriceOverrides } from "@/app/data/accessories";
import { machines } from "@/app/data/machines";

/** Resolves an accessory's USD price for a given machine, or null if it's quoted on request. */
export function getAccessoryPrice(
  machineId: string,
  accessoryId: string,
): number | null {
  const override = accessoryPriceOverrides[machineId]?.[accessoryId];
  if (override !== undefined) return override;
  const accessory = accessories.find((a) => a.id === accessoryId);
  return accessory?.price ?? null;
}

export type QuoteTotals = {
  machinePrice: number;
  accessoriesTotal: number;
  total: number;
  hasOnRequestItem: boolean;
};

export function calculateQuoteTotals(
  machineId: string | null,
  accessoryIds: string[],
): QuoteTotals {
  const machine = machines.find((m) => m.id === machineId);
  const machinePrice = machine?.price ?? 0;

  let accessoriesTotal = 0;
  let hasOnRequestItem = false;

  for (const id of accessoryIds) {
    const price = machineId ? getAccessoryPrice(machineId, id) : null;
    if (price === null) {
      hasOnRequestItem = true;
    } else {
      accessoriesTotal += price;
    }
  }

  return {
    machinePrice,
    accessoriesTotal,
    total: machinePrice + accessoriesTotal,
    hasOnRequestItem,
  };
}
