import { Session } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getUrl,
  getContainedResourceUrlAll,
  getDatetime,
  getThingAll,
  getStringWithLocale,
} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";

/* PROFILE */
export async function getProfileInfo(
  session: Session,
  podUrl: string
): Promise<{
  name: string;
  mbox: string;
  description: string;
  img: string;
  phone: string;
}> {
  const dataset = await getSolidDataset(`${podUrl}/profile/card#me`, {
    fetch: session.fetch,
  });
  const profileThing = getThing(dataset, `${podUrl}/profile/card#me`);

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

/* POSTS */
type Post = {
  text: string | null;
  video?: string | null;
  image?: string | null;
};

export async function getPosts(
  session: Session,
  podUrl: string
): Promise<Post[]> {
  const postsDataset = await getSolidDataset(`${podUrl}/profile/posts/`, {
    fetch: session.fetch,
  });
  const resources = getContainedResourceUrlAll(postsDataset);

  const posts = await Promise.all(
    resources.map(async (resource) => {
      const resourceDataset = await getSolidDataset(resource, {
        fetch: session.fetch,
      });
      return getThingAll(resourceDataset).map((thing) => {
        const text = getStringNoLocale(thing, "https://schema.org/text");
        const video = getUrl(thing, "https://schema.org/video");
        const image = getUrl(thing, "https://schema.org/image");
        return { text, video, image };
      });
    })
  );

  return posts.flat();
}

/* APPOINTMENTS */
type Appointment = {
  type: string | null;
  location: string | null;
  provider: string | null;
  date: string | null;
  time: string | null;
};

export async function getAppointments(
  session: Session,
  podUrl: string
): Promise<Appointment[]> {
  const appointmentsDataset = await getSolidDataset(`${podUrl}/appointments/`, {
    fetch: session.fetch,
  });
  const resources = getContainedResourceUrlAll(appointmentsDataset);

  const appointments = await Promise.all(
    resources.map(async (resource) => {
      const resourceDataset = await getSolidDataset(resource, {
        fetch: session.fetch,
      });
      return getThingAll(resourceDataset).map((thing) => {
        const type =
          getStringNoLocale(thing, "https://schema.org/additionalType") ?? null;
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
      });
    })
  );

  return appointments.flat();
}
