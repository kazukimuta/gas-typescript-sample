const Config = {
    /* 転送先メールアドレス */
    to: "tensousaki@mail.com",
    /* 転送メールの返信先アドレス。転送先の人がメール返信するときのアドレス。 */
    replyTo: "replyTo@mail.com",
    /* 転送メールのCC. 半角カンマ区切りで復数指定可能 */
    cc: "cc1@mail.com, cc2@mail.com",

    /**
     * 転送メールの件名
     * @param originalSubject : 元メールの件名
     * @returns 転送メールに付与する件名
     */
    getSubject: function (originalSubject: string) {
        return `【転送】 ${originalSubject}`;
    },

    /**
     * 転送メールのメール本文
     * @param sendDate : 送信日時
     * @param sendFrom : 送信元
     * @param mailBody : 元メールのメール本文(plainText)
     * @returns
     */
    getBody: function (sendDate: GoogleAppsScript.Base.Date, sendFrom: string, mailBody: string) {
        return `

お世話になっております。
以下のメールを転送いたします。

受信日時 : ${sendDate}
送信元 : ${sendFrom}
===========================================================

${mailBody}

`;
    },
};
