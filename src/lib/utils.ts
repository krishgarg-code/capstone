import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim() // Trim leading/trailing spaces
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

export function findEventBySlug(events: any[], slug: string): any | undefined {
  return events.find(event => generateSlug(event.title) === slug);
}