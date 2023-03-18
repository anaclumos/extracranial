# This is a newsletter automation tool for newsletters.cho.sh

import requests
import datetime
import os
import frontmatter
from dotenv import load_dotenv

load_dotenv()

server = "https://newsletters.cho.sh/api/campaigns"
username = os.environ["NEWSLETTERS_CHO_SH_USERNAME"]
password = os.environ["NEWSLETTERS_CHO_SH_PASSWORD"]

CONFIG = {
    "ko": {
        "audience": 3,
        "time": "T01:00:00Z",  # 10 AM KST
    },
    "en": {
        "audience": 4,
        "time": "T17:00:00Z",  # 10 AM LA time, 1 PM NYC time, 5 PM London time
    },
}


def get_campaigns():
    """Get all campaigns"""
    return requests.get(server, auth=(username, password)).json()


def create_campaign(title, body, lang="en"):
    """Create a new campaign"""
    tomorrow = (datetime.datetime.utcnow() + datetime.timedelta(days=1)).strftime(
        "%Y-%m-%d"
    )
    res = requests.post(
        server,
        auth=(username, password),
        json={
            "name": title,
            "subject": title,
            "type": "regular",
            "content_type": "markdown",
            "body": body,
            "altbody": body,
            "lists": [CONFIG[lang]["audience"]],
            "send_at": tomorrow + CONFIG[lang]["time"],
        },
    ).json()
    requests.put(
        server + "/" + str(res["data"]["id"]) + "/status",
        auth=(username, password),
        json={"status": "scheduled"},
    )


def find_today_newsletters(lang):
    """Find the newsletter for today in the Research folder. All UTC."""
    today = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    all_md_files = []
    newsletters = []
    for root, _, files in os.walk("./Research/pages"):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                all_md_files.append(os.path.join(root, file))
    for md_file in all_md_files:
        with open(md_file, "r") as f:
            post = frontmatter.load(f)
        if (
            "newsletter" in post.keys()
            and post["newsletter"] == today
            and post["lang"] == lang
        ):
            title = ".".join(md_file.split("/")[-1].split(".")[:-1])
            newsletters.append((title, post.content))
    return newsletters


def schedule_newsletter(lang):
    """Schedule the newsletter for today."""
    newsletters = find_today_newsletters(lang)
    if newsletters:
        campaigns = get_campaigns()["data"]["results"]
        for title, post in newsletters:
            duplicate = False
            for campaign in campaigns:
                if title in campaign["name"]:
                    print("Duplicate...", title)
                    duplicate = True
            if not duplicate:
                print("Scheduling...", title)
                create_campaign(title, post, lang)
    else:
        print("No newsletter for today.")


schedule_newsletter("en")
schedule_newsletter("ko")
