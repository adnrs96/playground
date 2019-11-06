function tweet repo: Map[string, any] issue: Map[string, any]
    repo_name = repo["full_name"]
    html_url = issue["html_url"]
    status = "New issue in {repo_name} for newcomer's - Checkout {html_url}"
    twitter tweet status: status
        
when github events webhooks events:["issues"] as result
    if ["labeled", "opened"].contains(item: result.payload["action"])
        gfis = ["good first issue", "good-first-issue"]
        issue = result.payload["issue"] to Map[string, any]
        foreach issue["labels"] as label
            clabel = label to Map[string, any]
            if gfis.contains(item: clabel["name"])
                tweet(repo: result.payload["repository"] issue: issue)
                break