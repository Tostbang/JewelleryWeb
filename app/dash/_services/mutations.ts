import { FetchData } from "@/lib/fetchData";
import { deleteToken } from "@/lib/helpers";
import { useMutation } from "@tanstack/react-query";


export const useSignOut = () => {
  return useMutation({
    mutationFn: (sesstionId: number) => {
      return FetchData("Auth/LogoutSession", {
        body: {
          sessionId: sesstionId
        },
        method: "POST",
        secure: true
      })
    },
    onSuccess: LogOut
  })
}

function LogOut() {
  deleteToken()
  window.location.href = "/";

}