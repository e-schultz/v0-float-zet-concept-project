"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocumentationLink() {
  return (
    <Link href="https://github.com/yourusername/zetteltweet#readme" target="_blank" rel="noopener noreferrer">
      <Button variant="ghost" className="w-full justify-start">
        <FileText className="h-4 w-4 mr-2" />
        Documentation
      </Button>
    </Link>
  )
}
