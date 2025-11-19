import fetch from 'node-fetch';

// Basic Eventbrite search: "hackathon"
export async function fetchEventbrite(apiKey) {
  const qs = new URLSearchParams({
    q: 'hackathon',
    'location.address': 'online',
    sort_by: 'date'
  });
  const url = `https://www.eventbriteapi.com/v3/events/search/?${qs.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  if (!res.ok) throw new Error('Eventbrite fetch failed');
  const data = await res.json();
  const items = data.events || [];

  return items.map(x => ({
    platform: 'eventbrite',
    externalId: String(x.id),
    title: x.name?.text,
    url: `https://www.eventbrite.com/e/${x.id}`,
    description: x.description?.text || '',
    start: x.start?.utc,
    end: x.end?.utc,
    prize: null,
    location: x.online_event ? 'online' : 'in-person',
    organizer: 'Eventbrite',
    themes: [],
    skills: [],
  }));
}
