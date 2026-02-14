import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from "microcms-js-sdk";

export interface Tag extends MicroCMSListContent {
  name: string;
}

export interface WorkDetail extends MicroCMSListContent {
  fieldId: "workDetail";
  title: string[];
  content: string;
}

export interface Event extends MicroCMSListContent {
  title: string;
  description: string; // ページで必要なので追加
  date: string;
  thumbnail?: MicroCMSImage;
}

export interface Award extends MicroCMSListContent {
  title: string;
  event: Event;
}

export interface Work extends MicroCMSListContent {
  title: string;
  creators: string;
  awards?: Award[];
  description: string;
  details: WorkDetail[];
  thumbnail?: MicroCMSImage;
  site_url?: string;
  github_url?: string;
  event?: Event[];
  tags?: Tag[];
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required.");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const getEvents = async (queries?: MicroCMSQueries) => {
  const minDate = "2010-01-01";
  const minDateFilter = `date[greater_than]${minDate}`;
  const combinedFilters = queries?.filters
    ? `${queries.filters} and ${minDateFilter}`
    : minDateFilter;

  return client.getList<Event>({
    endpoint: "events",
    queries: { ...queries, filters: combinedFilters },
  });
};

export const getEvent = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return client.get<Event>({
    endpoint: "events",
    contentId,
    queries,
  });
};

export const getWorks = async (queries?: MicroCMSQueries) => {
  return client.getList<Work>({
    endpoint: "works",
    queries,
  });
};

export const getWork = async (contentId: string, queries?: MicroCMSQueries) => {
  return client.get<Work>({
    endpoint: "works",
    contentId,
    queries,
  });
};

export const getAllEventIds = async (
  queries?: Omit<MicroCMSQueries, "limit" | "offset">,
) => {
  let allContentIds: { id: string }[] = [];
  let offset = 0;
  const limit = 100; // microCMSの最大取得件数

  const minDate = "2010-01-01";
  const minDateFilter = `date[greater_than_or_equal]${minDate}`;
  const baseFilters = queries?.filters
    ? `${queries.filters} and ${minDateFilter}`
    : minDateFilter;

  while (true) {
    const data = await client.getList<Event>({
      endpoint: "events",
      queries: {
        ...queries,
        fields: "id",
        limit,
        offset,
        filters: baseFilters,
      },
    });

    allContentIds = [
      ...allContentIds,
      ...data.contents.map((c) => ({ id: c.id })),
    ];

    // 最大100件取得し終わったらループを抜ける
    if (allContentIds.length >= data.totalCount) {
      break;
    }
    offset += limit;
  }
  return allContentIds;
};

export const getAllWorkIds = async (
  queries?: Omit<MicroCMSQueries, "limit" | "offset">,
) => {
  let allContentIds: { id: string }[] = [];
  let offset = 0;
  const limit = 100; // microCMSの最大取得件数

  while (true) {
    const data = await client.getList<Work>({
      endpoint: "works",
      queries: { ...queries, fields: "id", limit, offset },
    });

    allContentIds = [
      ...allContentIds,
      ...data.contents.map((c) => ({ id: c.id })),
    ];

    if (allContentIds.length >= data.totalCount) {
      break;
    }
    offset += limit;
  }
  return allContentIds;
};
