import { cookies } from "next/headers"
import CallBackCard from "../_components/CallBackCard"

export default async function CallbackPage() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("paymentId")?.value
  return (
    <CallBackCard token={token} />
  )
}