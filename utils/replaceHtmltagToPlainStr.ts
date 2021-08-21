export function replaceHtmltagToPlainStr(htmlStr: string) {
  const regex = /<("[^"]*"|'[^']*'|[^'">])[^<>]*>/g;
  const str = htmlStr.replace(regex, '');

  return str;
}