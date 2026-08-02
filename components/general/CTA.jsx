import { Button } from 'components/ui'
import Link from 'next/link'
import React from 'react'

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-grid-faint" aria-hidden="true" />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Ready for your next event?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
              Set up your portal, invite volunteers and start issuing QR passes today.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register">Create an account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}
