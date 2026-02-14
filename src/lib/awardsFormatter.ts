export type formattedAward = {
  eventId: string;
  eventTitle: string;
  awardTitle: string;
};

export function awardFormatter(
  awards: Array<any> | undefined | null,
): formattedAward[] {
  if (!Array.isArray(awards)) return [];

  return awards.map((item) => ({
    eventId: String(item?.event?.id ?? ""),
    eventTitle: item?.event?.title ?? "",
    awardTitle: item?.title ?? "",
  }));
}

export default awardFormatter;
