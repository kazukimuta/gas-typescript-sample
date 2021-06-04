const GmailService = {
    /**
     * GmailApp.searchメソッドの検索queryを生成する
     */
    buildSearchQuery: function (params: { from: any; to: any; some?: string }): string {
        // Gmailの検索クエリで指定できる条件は以下を参照
        // https://qiita.com/akatsuki174/items/d7471760754829ced7df

        // SerchのqueryはUNIX時間を指定可能
        // https://qiita.com/3mc/items/39b2c8241c6b52811ad2
        let query = `after: ${params.from.unix()} before: ${params.to.unix()} `;
        return query;
    },

    /**
     * 検索条件にヒットするメールスレッドを取得する
     * ※ メールスレッドについては、以下を参照
     * ※ https://dev.classmethod.jp/articles/google-app-script-gmail-filter/
     */
    findMails: function (query: string): GoogleAppsScript.Gmail.GmailThread[] {
        let i = 0;
        let allThreads: GoogleAppsScript.Gmail.GmailThread[] = [];
        const limit = 100;
        while (true) {
            // 一度の取得件数に上限があるため、再起取得にする
            const thread = GmailApp.search(query, i * limit, limit);
            if (thread.length == 0) {
                break;
            }
            allThreads = allThreads.concat(thread);
            i++;
        }
        return allThreads;
    },

    /**
     * 転送メールを組み立てる
     */
    createForwardMail: function (messages: GoogleAppsScript.Gmail.GmailMessage[]): GoogleAppsScript.Mail.MailAdvancedParameters {
        // スレッドの一番最新のメールを取得する
        const msg = messages[messages.length - 1];
        const params: GoogleAppsScript.Mail.MailAdvancedParameters = {
            to: Config.to,
            cc: Config.cc,
            replyTo: Config.replyTo,
            subject: Config.getSubject(msg.getSubject()),
            body: Config.getBody(msg.getDate(), msg.getFrom(), msg.getPlainBody()),
        };
        return params;
    },
};
