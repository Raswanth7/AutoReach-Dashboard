// app/about/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 font-mont">
      <Card className="shadow-xs shadow-orange-400">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/avatar.jpg" alt="Raswanth" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">Raswanth M K</CardTitle>
          <p className="text-muted-foreground text-sm">Full-Stack Developer | Cloud Engineer</p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 mt-4">
          <section>
            <h2 className="font-semibold text-lg mb-2">About Me</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
            I design and build thoughtful, modern web experiences. Clean code, elegant interfaces, and seamless functionality that’s my approach. From intuitive frontends to cloud-powered backends, every detail matters. I believe great digital products feel effortless and reliable. Let’s craft something exceptional, together.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Services</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Web Development</li>
              <li>App Development</li>
              <li>Cloud Integrations</li>
              <li>Automations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">Contact</h2>
            <div className="flex flex-row gap-4">
            <p className="text-sm text-muted-foreground flex flex-col gap-2">
            <Link href="mailto:raswanthoff7@gmail.com"  className="flex flex-row gap-1"> <Mail size={20}/> raswanthoff7@gmail.com</Link>
              <Link href='#' className="flex flex-row gap-1"><Linkedin size={20}/>Linkedin</Link>
            <Link href='#' className="flex flex-row gap-1"><Globe size={20} />Portfolio</Link>
            </p>
            <p className="text-sm text-muted-foreground flex flex-col gap-2">
            <Link href='#' className="flex flex-row gap-1"><Github  size={20}/>Github</Link> 
            <Link href='#' className="flex flex-row gap-1"><Instagram  size={20}/>Instagram</Link>
            </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
