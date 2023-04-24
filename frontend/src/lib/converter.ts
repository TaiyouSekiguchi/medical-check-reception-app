// 全角ひらがな → 全角カタカナ
export const hiraToKana = (str: string): string => {
  return str.replace(/[\u3041-\u3094]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) + 0x60)
  );
};

// 全角の濁点&半濁点 → 半角の濁点&半濁点
export const narrowDakuten = (str: string): string => {
  return str
    .replace(/\u309B|\u3099/g, '\uFF9E')
    .replace(/\u309C|\u309A/g, '\uFF9F');
};

// 全角カタカナ → 半角カタカナ
export const narrowKatakana = (str: string): string => {
  const convertMap = {
    ァ: 'ｧ',
    ィ: 'ｨ',
    ゥ: 'ｩ',
    ェ: 'ｪ',
    ォ: 'ｫ',
    ャ: 'ｬ',
    ュ: 'ｭ',
    ョ: 'ｮ',
    ッ: 'ｯ',
    ヵ: 'ｶ',
    ヶ: 'ｹ',
    ヮ: 'ﾜ',
    ー: 'ｰ',
    ア: 'ｱ',
    イ: 'ｲ',
    ウ: 'ｳ',
    エ: 'ｴ',
    オ: 'ｵ',
    カ: 'ｶ',
    キ: 'ｷ',
    ク: 'ｸ',
    ケ: 'ｹ',
    コ: 'ｺ',
    サ: 'ｻ',
    シ: 'ｼ',
    ス: 'ｽ',
    セ: 'ｾ',
    ソ: 'ｿ',
    タ: 'ﾀ',
    チ: 'ﾁ',
    ツ: 'ﾂ',
    テ: 'ﾃ',
    ト: 'ﾄ',
    ナ: 'ﾅ',
    ニ: 'ﾆ',
    ヌ: 'ﾇ',
    ネ: 'ﾈ',
    ノ: 'ﾉ',
    ハ: 'ﾊ',
    ヒ: 'ﾋ',
    フ: 'ﾌ',
    ヘ: 'ﾍ',
    ホ: 'ﾎ',
    マ: 'ﾏ',
    ミ: 'ﾐ',
    ム: 'ﾑ',
    メ: 'ﾒ',
    モ: 'ﾓ',
    ヤ: 'ﾔ',
    ユ: 'ﾕ',
    ヨ: 'ﾖ',
    ラ: 'ﾗ',
    リ: 'ﾘ',
    ル: 'ﾙ',
    レ: 'ﾚ',
    ロ: 'ﾛ',
    ワ: 'ﾜ',
    ン: 'ﾝ',
    ヰ: 'ｲ',
    ヱ: 'ｴ',
    ヲ: 'ｦ',
    ガ: 'ｶﾞ',
    ギ: 'ｷﾞ',
    グ: 'ｸﾞ',
    ゲ: 'ｹﾞ',
    ゴ: 'ｺﾞ',
    ザ: 'ｻﾞ',
    ジ: 'ｼﾞ',
    ズ: 'ｽﾞ',
    ゼ: 'ｾﾞ',
    ゾ: 'ｿﾞ',
    ダ: 'ﾀﾞ',
    ヂ: 'ﾁﾞ',
    ヅ: 'ﾂﾞ',
    デ: 'ﾃﾞ',
    ド: 'ﾄﾞ',
    バ: 'ﾊﾞ',
    ビ: 'ﾋﾞ',
    ブ: 'ﾌﾞ',
    ベ: 'ﾍﾞ',
    ボ: 'ﾎﾞ',
    パ: 'ﾊﾟ',
    ピ: 'ﾋﾟ',
    プ: 'ﾌﾟ',
    ペ: 'ﾍﾟ',
    ポ: 'ﾎﾟ',
    ヷ: 'ﾜﾞ',
    ヸ: 'ｲﾞ',
    ヴ: 'ｳﾞ',
    ヹ: 'ｴﾞ',
    ヺ: 'ｦﾞ',
  };

  for (const [wideKana, narrowKana] of Object.entries(convertMap)) {
    str = str.replace(new RegExp(wideKana, 'g'), narrowKana);
  }

  return str;
};

export const toHalfWidthKatakana = (str: string): string => {
  str = hiraToKana(str);
  str = narrowDakuten(str);
  str = narrowKatakana(str);

  return str;
};
