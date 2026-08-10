import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
};

/**
 * Shared project-photo grid. Every image gets the same 4:3 crop and border, so
 * galleries read consistently across pages. Photos always render in colour.
 *
 * `feature` promotes the first image to a wider tile on larger screens — use it
 * where the gallery is the main event (the wardrobes page), and leave it off
 * for supporting strips (the about page).
 */
export default function PhotoGallery({
  images,
  feature = false,
}: {
  images: GalleryImage[];
  feature?: boolean;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`relative aspect-[4/3] rounded-sharp overflow-hidden border border-line group ${
            feature && i === 0 ? "sm:col-span-2 lg:col-span-2 lg:aspect-[8/5]" : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
