when twitter stream tweets filter: "#storyscript" as tweet
    res = machinebox/textbox analyze input:tweet.text
    if res.positive
        tweet like
