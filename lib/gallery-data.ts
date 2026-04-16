export interface GalleryEvent {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  color: string;
  span?: string;
  photos: { id: number; url: string; alt: string; color: string }[];
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: 1,
    slug: "bandung-trip-2025",
    title: "Bandung Trip 2025",
    date: "9 Februari 2025",
    description: "Keseruan trip ke Tahura & Tebing Keraton",
    color: "bg-blue-400",
    span: "md:col-span-3 md:row-span-2", // Lebih besar: 3 kolom
    photos: [
      {
        id: 1,
        url: "/images/galeri/bandung-trip-2025/bandung (1).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 2,
        url: "/images/galeri/bandung-trip-2025/bandung (2).jpg",
        alt: "Gathering 2",
        color: "bg-blue-400",
      },
      {
        id: 3,
        url: "/images/galeri/bandung-trip-2025/bandung (3).jpg",
        alt: "Gathering 3",
        color: "bg-blue-300",
      },
      {
        id: 4,
        url: "/images/galeri/bandung-trip-2025/bandung (4).jpg",
        alt: "Gathering 4",
        color: "bg-sky",
      },
      {
        id: 5,
        url: "/images/galeri/bandung-trip-2025/bandung (5).jpg",
        alt: "Gathering 4",
        color: "bg-sky",
      },
      {
        id: 6,
        url: "/images/galeri/bandung-trip-2025/bandung (6).jpg",
        alt: "Gathering 4",
        color: "bg-sky",
      },
      {
        id: 7,
        url: "/images/galeri/bandung-trip-2025/bandung (7).jpg",
        alt: "Gathering 4",
        color: "bg-sky",
      },
      {
        id: 8,
        url: "/images/galeri/bandung-trip-2025/bandung (8).jpg",
        alt: "Gathering 4",
        color: "bg-sky",
      },
    ],
  },
  {
    id: 2,
    slug: "museum-pancasila-2025",
    title: "Museum Pancasila Sakti",
    date: "27 April 2025",
    description: "Keseruan gathering perdana di awal tahun 2025.",
    color: "bg-blue-400",
    span: "md:col-span-1 md:row-span-1", // Normal: 2 kolom, 1 baris
    photos: [
      {
        id: 1,
        url: "/images/galeri/museum-pancasila-2025/pancasila (1).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 2,
        url: "/images/galeri/museum-pancasila-2025/pancasila (2).jpg",
        alt: "Gathering 2",
        color: "bg-blue-500",
      },
      {
        id: 3,
        url: "/images/galeri/museum-pancasila-2025/pancasila (3).jpg",
        alt: "Gathering 3",
        color: "bg-blue-500",
      },
      {
        id: 4,
        url: "/images/galeri/museum-pancasila-2025/pancasila (4).jpg",
        alt: "Gathering 4",
        color: "bg-blue-500",
      },
      {
        id: 5,
        url: "/images/galeri/museum-pancasila-2025/pancasila (5).jpg",
        alt: "Gathering 5",
        color: "bg-blue-500",
      },
      {
        id: 6,
        url: "/images/galeri/museum-pancasila-2025/pancasila (6).jpg",
        alt: "Gathering 6",
        color: "bg-blue-500",
      },
      {
        id: 7,
        url: "/images/galeri/museum-pancasila-2025/pancasila (7).jpg",
        alt: "Gathering 7",
        color: "bg-blue-500",
      },
      {
        id: 8,
        url: "/images/galeri/museum-pancasila-2025/pancasila (8).jpg",
        alt: "Gathering 8",
        color: "bg-blue-500",
      },
    ],
  },
  {
    id: 3,
    slug: "curug-leuwi-hejo-2025",
    title: "Curug LeuwiHejo",
    date: "16 Agustus 2025",
    description: "Keseruan gathering perdana di awal tahun 2025.",
    color: "bg-blue-400",
    span: "md:col-span-1 md:row-span-2", // Tinggi: 1 kolom, 2 baris
    photos: [
      {
        id: 1,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (1).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 2,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (2).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 3,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (3).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 4,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (4).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 5,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (5).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 6,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (6).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 7,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (7).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 8,
        url: "/images/galeri/curug-leuwi-hejo-2025/leuwi (8).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
    ],
  },
  {
    id: 4,
    slug: "tahun-baru-2026",
    title: "Tahun Baru 2026",
    date: "31 Desember 2025",
    description: "Perayaan tahun baru yang meriah.",
    color: "bg-blue-400",
    span: "md:col-span-2 md:row-span-1", // Normal: 2 kolom, 1 baris
    photos: [
      {
        id: 1,
        url: "/images/galeri/tahun-baru-2026/tahunbaru.jpeg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 2,
        url: "/images/galeri/tahun-baru-2026/tahunbaru.jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
    ],
  },
  {
    id: 5,
    slug: "curug-cilember-2026",
    title: "Curug Cilember",
    date: "21 Februari 2026",
    description: "Keseruan gathering perdana di awal tahun 2025.",
    color: "bg-blue-400",
    span: "md:col-span-1 md:row-span-1", // Kecil: 1 kolom, 1 baris
    photos: [
      {
        id: 1,
        url: "/images/galeri/cilember-2026/cilember (1).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 2,
        url: "/images/galeri/cilember-2026/cilember (2).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 3,
        url: "/images/galeri/cilember-2026/cilember (3).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 4,
        url: "/images/galeri/cilember-2026/cilember (4).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 5,
        url: "/images/galeri/cilember-2026/cilember (5).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 6,
        url: "/images/galeri/cilember-2026/cilember (6).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
      {
        id: 7,
        url: "/images/galeri/cilember-2026/cilember (7).jpg",
        alt: "Gathering 1",
        color: "bg-blue-500",
      },
    ],
  },
];
