import { bookingFormUrls, manualOverride } from "@/config/bookingForms";
import { checkFormOpenStatus } from "./checkFormStatus";

export async function getBookingStatus(id: string): Promise<boolean> {

  const override = manualOverride[id];
  if (override !== null && override !== undefined) {
    return override;
  }

  const formUrl = bookingFormUrls[id];
  if (!formUrl) {
    return true;
  }

  return checkFormOpenStatus(formUrl);
}