import slugify from 'slugify';

export default function generateSlug(eventName: string): string {
    return slugify(eventName, { lower: true, strict: true });
}
