import { Session } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getThingAll,
  getStringNoLocale,
  getUrl,
  getProfileAll,
  getThing,
  getPropertyAll,
  getAgentAccessAll,
  getResourceInfo,
} from "@inrupt/solid-client";

const PII_NAMESPACE = "http://example.org/profile/pii#";
const POSTS_NAMESPACE = "http://example.org/profile/posts#";

export async function test(session: Session, podUrl: string) {
  const dataset = await getSolidDataset(`${podUrl}/osoc1/`, {
    fetch: session.fetch,
  });

  return Promise.all(
    getThingAll(dataset).map(async (t) => ({
      url: t.url,
      properties: getPropertyAll(t),
    }))
  );
}

export async function fetchUserProfile(session: Session, podUrl: string) {
  const profileDataset = await getSolidDataset(`${podUrl}/osoc1/`, {
    fetch: session.fetch,
  });

  console.log("profileDataset", profileDataset); // works

  // Get all profiles from the dataset
  //   const profiles = await getProfileAll(`${podUrl}/osoc1/`);
  //   console.log("profiles", profiles);

  //   // Get all things in the dataset
  const allThings = getThingAll(profileDataset);
  console.log("allThings", allThings);

  // Correct URL of the profile thing
  const profileThingUrl = `${podUrl}/osoc1/profile/pii`;
  console.log("profileThingUrl", profileThingUrl);

  // Find the profile thing
  const profileThing = allThings.find((thing) => thing.url === profileThingUrl);

  console.log("profilething1", profileThing);

  if (!profileThing) {
    throw new Error("Profile not found");
  }

  const name = getStringNoLocale(profileThing, `${PII_NAMESPACE}name`);
  const mbox = getStringNoLocale(profileThing, `${PII_NAMESPACE}mbox`);
  const img = getUrl(profileThing, `${PII_NAMESPACE}img`);
  const description = getStringNoLocale(
    profileThing,
    `${PII_NAMESPACE}description`
  );

  return { name, mbox, img, description };
}

export async function fetchPosts(session: Session, podUrl: string) {
  const postsDataset = await getSolidDataset(`${podUrl}/osoc1/posts/`, {
    fetch: session.fetch,
  });
  const postThings = getThingAll(postsDataset);

  const posts = postThings.map((postThing) => {
    const image = getUrl(postThing, `${POSTS_NAMESPACE}image`);
    const text = getStringNoLocale(postThing, `${POSTS_NAMESPACE}text`);
    const video = getUrl(postThing, `${POSTS_NAMESPACE}video`);

    return { image, text, video };
  });

  return posts;
}
