import { FetchData } from "@/lib/fetchData"
import { useQuery } from "@tanstack/react-query"

export default function useGetProfile() {
  return useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const profile = await FetchData("Auth/GetMyProfile", {
        secure: true,
        tags: ["profile"]
      })
      return profile.user
    },
  })
}
