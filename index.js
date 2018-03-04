// module.exports = (robot) => {
//   // Your code here
//   robot.log('Yay, the app was loaded!')

//   // For more information on building apps:
//   // https://probot.github.io/docs/

//   // To get your app running against GitHub, see:
//   // https://probot.github.io/docs/development/
// }



module.exports = robot => {
  /*getForRepo的用处是列出一个包的问题，其中creator参数估计是列出指定用户提的问题
  state代表问题的状态*/
  robot.on('issues.opened', async context => {
    const response = await context.github.issues.getForRepo(context.repo({
      state: 'all',         
      creator: context.payload.issue.user.login              //payload 是所传输的信息，是在协议载体下所传输的信息。
    }))
    // context.repo返回的是{owner:...,repo:....},而getForRepo需要的必须参数就是owner和repo,state和creator是可选参数
    // const result = await octokit.issues.getForRepo({owner, repo, milestone, state, assignee, creator, per_page});
    
    context.log("+++++++++++++++++++++++++++++++++")
    console.log("_________________________________________________________");
    context.log(context.payload);                                      //和event webhook有关？？？？？？？？？？？？？？？
    context.log("++++++++++++++++++++++++++++++++++");
    // const countIssue = response.data.filter(data => !data.pull_request)  
    context.log(response);
    if (response.data.length==1) {
      try {
        const config = await context.config('config.yml')
        // if (config.newIssueWelcomeComment) {
          // context.github.issues.createComment(context.issue({body: config.newIssueWelcomeComment}))
          context.github.issues.createComment(context.issue({body:"thanks for your issues!"}));
          
        // }
      } catch (err) {
        if (err.code !== 404) {
          throw err
        }
      }
    }
  })
}



// module.exports = robot => {
//   robot.on('issues.opened', async context => {
//     context.log(context);
//     context.log("+++++++++++++++++++++++++++++++++++++");
//     context.log(context.github);
//     context.log("___________________________________");
//     context.log(context.payload.comment);
//     const body = context.payload.comment.body
//     context.log(body+"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");                               //有点诡异  这个显示body读取不了，是sentiment错了吗？？？
//     // `context` extracts information from the event, which can be passed to
//     // GitHub API calls. This will return:
//     //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
//     const params = context.issue({body: 'Hello World!'})

//     // Post a comment on the issue
//     return context.github.issues.createComment(params)

//   })
// }
