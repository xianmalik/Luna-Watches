import Image from 'next/image'

interface Feature {
  icon: string
  headline: string
  lines: string[]
}

interface FeaturesGridProps {
  title?: string
  features?: Feature[]
}

export default function FeaturesGrid({ title, features }: FeaturesGridProps) {
  if (!features || features.length === 0) return null

  return (
    <section className="container mx-auto max-w-screen-xl px-4 py-16">
      <h2 className="text-3xl font-bold mb-14 uppercase text-center tracking-wide">
        {title ?? 'Features'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.headline}
            className="flex flex-col items-center justify-end bg-[#EFEFEF] rounded-md px-6 pt-10 pb-8 text-center"
          >
            <Image
              src={feature.icon}
              alt={feature.headline}
              width={100}
              height={100}
              className="mb-8"
            />
            <p className="text-lg font-bold uppercase tracking-wide">
              {feature.headline}
            </p>
            {feature.lines.map((line) => (
              <p
                key={line}
                className="text-xs text-muted-foreground uppercase tracking-widest"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
