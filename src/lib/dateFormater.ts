const dateFormatter = (dateString: string): string => {
  const date = new Date(dateString);
  // 日本時間(UTC+9)に変換
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = jstDate.getUTCFullYear();
  const month = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jstDate.getUTCDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export default dateFormatter;
