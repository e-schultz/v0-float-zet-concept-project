"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNotes } from "@/lib/data"
import MobileNav from "@/components/mobile-nav"

export default function GraphView() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [notes, setNotes] = useState<ReturnType<typeof getNotes>>([])
  const [hoveredNode, setHoveredNode] = useState<{ id: string; content: string; x: number; y: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setNotes(getNotes())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || notes.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = Math.min(window.innerHeight * 0.6, 500)

      drawGraph()
    }

    // Draw the graph
    const drawGraph = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create nodes for each note
      const nodes = notes.map((note, index) => {
        const angle = (index / notes.length) * Math.PI * 2
        const radius = Math.min(canvas.width, canvas.height) * 0.35
        const x = canvas.width / 2 + radius * Math.cos(angle)
        const y = canvas.height / 2 + radius * Math.sin(angle)

        return { id: note.id, x, y, note }
      })

      // Draw connections between notes that share tags
      ctx.strokeStyle = "rgba(255, 105, 180, 0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i]
          const nodeB = nodes[j]

          // Check if notes share any tags
          const sharedTags = nodeA.note.tags.filter((tag) => nodeB.note.tags.includes(tag))

          if (sharedTags.length > 0) {
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        // Draw node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = "hsl(var(--primary))"
        ctx.fill()

        // Draw node label
        ctx.fillStyle = "hsl(var(--foreground))"
        ctx.font = "12px var(--font-mono)"
        ctx.textAlign = "center"
        ctx.fillText(node.note.content.substring(0, 15) + "...", node.x, node.y + 25)
      })
    }

    // Handle mouse move for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create nodes for each note
      const nodes = notes.map((note, index) => {
        const angle = (index / notes.length) * Math.PI * 2
        const radius = Math.min(canvas.width, canvas.height) * 0.35
        const nodeX = canvas.width / 2 + radius * Math.cos(angle)
        const nodeY = canvas.height / 2 + radius * Math.sin(angle)

        return { id: note.id, x: nodeX, y: nodeY, content: note.content }
      })

      // Check if mouse is over a node
      const hoveredNode = nodes.find((node) => {
        const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2))
        return distance <= 10
      })

      setHoveredNode(hoveredNode || null)
    }

    // Initial setup
    resizeCanvas()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [notes])

  return (
    <>
      <MobileNav />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <motion.h1
          className="text-2xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Knowledge Graph
        </motion.h1>

        <motion.div
          className="border border-primary/20 rounded-lg p-4 bg-background relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-4 text-sm text-muted-foreground">
            This graph visualizes the connections between your notes based on shared tags and mentions.
          </div>
          <div className="w-full relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <motion.div
                  className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
            ) : (
              <>
                <canvas ref={canvasRef} className="w-full" height="500" />
                {hoveredNode && (
                  <div
                    className="absolute bg-background/90 backdrop-blur-sm border border-primary/20 p-2 rounded-lg shadow-lg z-10 max-w-[200px]"
                    style={{
                      left: `${hoveredNode.x + 20}px`,
                      top: `${hoveredNode.y - 20}px`,
                      transform: "translateY(-100%)",
                    }}
                  >
                    <p className="text-sm">{hoveredNode.content}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/notes/${note.id}`} className="block">
                <div className="border border-primary/20 rounded-lg p-4 hover:bg-muted transition-colors">
                  <p className="line-clamp-2">{note.content}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs text-primary font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
