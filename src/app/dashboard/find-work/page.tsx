import type { Metadata } from "next"
import FindWorkClientPage from "./FindWorkClientPage"

export const metadata: Metadata = {
  title: "Find Work | GigIndia",
  description: "Browse and apply for freelance projects",
}

export default function FindWorkPage() {
  return <FindWorkClientPage />
}
