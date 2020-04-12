/* eslint-disable no-useless-escape */

import { FormattedText } from "../types";

const highlightRegExpLeft = '\<h\>';
const highlightRegExpRight = '\<\/h\>';

class HighlightTextHandler {
  static highlightRegExp = new RegExp(`${highlightRegExpLeft}.+?${highlightRegExpRight}`, 'g')
  static highlightForRemoveTagRegExp = new RegExp(`${highlightRegExpLeft}|${highlightRegExpRight}`, 'g')

  static removeHighlightTag(content: string) {
    return content.replace(this.highlightForRemoveTagRegExp, '');
  }

  static splitTextWithRegExp(text: string): FormattedText[] {
    let res: FormattedText[] = [];
    let textNow = text;

    const matchRes = text.match(this.highlightRegExp);
    console.log(text, matchRes);

    if(matchRes) {
      for (let i = 0; i < matchRes.length; i++) {
        const matchedStr = matchRes[i];
        const matchedStrLength = matchedStr.length;
        const matchedFirstIndex = textNow.indexOf(matchedStr);

        const matchedNormalStr = textNow.slice(0, matchedFirstIndex);
        res = [
          ...res,
          {
            type: 'normal',
            content: matchedNormalStr,
          }
        ];

        textNow = textNow.slice(matchedFirstIndex);
        const content = this.removeHighlightTag(matchedStr);
        res = [
          ...res,
          {
            type: 'highlight',
            content,
          }
        ];
        textNow = textNow.slice(matchedStrLength);
      }
    }
    //us remain texts?
    if(textNow) {
      res = [
        ...res,
        {
          type: 'normal',
          content: textNow,
        }
      ];
    }

    return res;
  }
}

export default HighlightTextHandler;