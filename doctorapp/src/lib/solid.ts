import {
  getPodUrlAll,
  getPropertyAll,
  getSolidDataset,
  getThingAll,
  getThing,
  getStringNoLocale,
  getUrl,
  getContainedResourceUrlAll,
  getDatetime,
  getStringWithLocale,
} from "@inrupt/solid-client";
import {
  getAgentAccessAll,
  getPublicAccess,
} from "@inrupt/solid-client/universal";
import { Session } from "@inrupt/solid-client-authn-browser";
import { FOAF } from "@inrupt/vocab-common-rdf";

export type url = string;

export type Post = {
  text: string | null;
  video: string | null;
  image: string | null;
};

export type Appointment = {
  type: string | null;
  location: string | null;
  provider: string | null;
  date: string | null;
  time: string | null;
};

/**
 * @param session An active Solid client connection
 * @param url URL to the user's pod
 * @returns the information about the user
 */
export async function getProfileInfo(
  session: Session,
  url: url
): Promise<{
  name: string;
  mbox: string;
  description: string;
  img: string;
  phone: string;
}> {
  const dataset = await getSolidDataset(`${url}/profile/card#me`, {
    fetch: session.fetch,
  });
  const profileThing = getThing(dataset, `${url}/profile/card#me`);

  if (!profileThing) {
    throw new Error("Profile information not found");
  }

  const name = getStringNoLocale(profileThing, FOAF.name) ?? "";
  const mbox = getUrl(profileThing, FOAF.mbox) ?? "";
  const description =
    getStringWithLocale(
      profileThing,
      "http://schema.org/description",
      "en-us"
    ) ?? "";
  const img = getUrl(profileThing, FOAF.img) ?? "";
  const phone = getUrl(profileThing, FOAF.phone) ?? "";

  return { name, mbox, description, img, phone };
}

/**
 * @param session An active Solid client connection
 * @param url URL to the user's pod
 * @returns get the users posts
 */
export async function getPosts(session: Session, url: url): Promise<Post[]> {
  const postsDataset = await getSolidDataset(`${url}/profile/posts/`, {
    fetch: session.fetch,
  });
  const resources = getContainedResourceUrlAll(postsDataset);

  const posts: Post[] = [];

  await Promise.all(
    resources.map(async (resource) => {
      const resourceDataset = await getSolidDataset(resource, {
        fetch: session.fetch,
      });
      const things = getThingAll(resourceDataset);
      posts.push(
        ...things.map((thing) => {
          const text = getStringNoLocale(thing, "https://schema.org/text");
          const video = getUrl(thing, "https://schema.org/video");
          const image = getUrl(thing, "https://schema.org/image");
          return { text, video, image };
        })
      );
    })
  );

  return posts;
}

/**
 * @param session An active Solid client connection
 * @param url URL to the user's pod
 * @returns the users appointments
 */
export async function getAppointments(
  session: Session,
  url: url
): Promise<Appointment[]> {
  const appointmentsDataset = await getSolidDataset(`${url}/appointments/`, {
    fetch: session.fetch,
  });
  const resources = getContainedResourceUrlAll(appointmentsDataset);

  const appointments: Appointment[] = [];

  await Promise.all(
    resources.map(async (resource) => {
      const resourceDataset = await getSolidDataset(resource, {
        fetch: session.fetch,
      });
      const things = getThingAll(resourceDataset);
      appointments.push(
        ...things.map((thing) => {
          const type =
            getStringNoLocale(thing, "https://schema.org/additionalType") ??
            null;
          const location =
            getStringNoLocale(thing, "https://schema.org/location") ?? null;
          const provider =
            getStringNoLocale(thing, "https://schema.org/provider") ?? null;
          const scheduledTime = getDatetime(
            thing,
            "https://schema.org/scheduledTime"
          );

          const date = scheduledTime
            ? new Date(scheduledTime).toLocaleDateString()
            : null;
          const time = scheduledTime
            ? new Date(scheduledTime).toLocaleTimeString()
            : null;

          return { type, location, provider, date, time };
        })
      );
    })
  );

  return appointments;
}
