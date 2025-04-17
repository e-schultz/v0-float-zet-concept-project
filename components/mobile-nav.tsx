"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Hash, BarChart2, MessageSquare, Settings, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  }

  const menuItems = [
    { icon: <BarChart2 className="h-5 w-5 mr-3" />, label: "Timeline", href: "/" },
    { icon: <Hash className="h-5 w-5 mr-3" />, label: "Graph View", href: "/graph" },
    { icon: <MessageSquare className="h-5 w-5 mr-3" />, label: "Threads", href: "/threads" },
    { icon: <Settings className="h-5 w-5 mr-3" />, label: "Settings", href: "/settings" },
    {
      icon: <FileText className="h-5 w-5 mr-3" />,
      label: "Documentation",
      href: "https://github.com/yourusername/zetteltweet#readme",
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center w-full py-4 px-4 md:hidden">
        <Link href="/">
          <motion.h1
            className="text-2xl font-bold text-primary glitch-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            ZettelTweet
          </motion.h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/create">
            <Button size="icon" variant="outline" className="rounded-full">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost" onClick={toggleMenu} className="rounded-full">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
          >
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-3/4 bg-card border-l border-primary/20 p-6 shadow-xl terminal"
              variants={menuVariants}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-primary font-mono">Menu</h2>
                <Button size="icon" variant="ghost" onClick={toggleMenu} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-4">
                {menuItems.map((item, i) => (
                  <motion.div key={item.label} custom={i} variants={menuItemVariants} onClick={toggleMenu}>
                    <Link href={item.href}>
                      <Button variant="ghost" className="w-full justify-start text-lg py-6 font-mono">
                        {item.icon}
                        {item.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="absolute bottom-8 left-0 right-0 px-6"
                variants={menuItemVariants}
                custom={menuItems.length}
              >
                <Link href="/create" className="w-full">
                  <Button className="w-full font-mono" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    New Note
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
