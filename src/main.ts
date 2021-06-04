function onOpen() {
    const ui = SpreadsheetApp.getActiveSpreadsheet().addMenu("テスト", [
        {
            name: "実行",
            functionName: "run",
        },
    ]);
}

/**
 * エントリポイント
 * スケジューラ実行の場合はこれを起動する
 */
function run() {
    // 一時間前の00分00秒から、59分59秒までを対象にする
    const from = Moment.moment().subtract(1, "hour").startOf("hour");
    const to = Moment.moment().subtract(1, "hour").endOf("hour");

    const searchQuery = GmailService.buildSearchQuery({
        from,
        to,
    });

    const allThreads = GmailService.findMails(searchQuery);
    const allMsgs = GmailApp.getMessagesForThreads(allThreads);

    allMsgs.map((msgs) => {
        const forwardMail = GmailService.createForwardMail(msgs);
        try {
            MailApp.sendEmail(forwardMail);
        } catch (e) {
            console.log(e.toString());
        }
    });
}
