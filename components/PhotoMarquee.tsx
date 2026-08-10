import Image from "next/image";

export default function PhotoMarquee({
  images,
  alt = "A&E Joinery project",
}: {
  images: string[];
  alt?: string;
}) {
  const track = [...images, ...images];

  return (
    <div className="marquee-wrap overflow-hidden">
      <div className="marquee-track flex gap-3 w-max">
        {track.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-40 sm:h-56 aspect-[4/3] rounded-sharp overflow-hidden border border-line shrink-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
