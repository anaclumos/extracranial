# This is a newsletter automation tool for newsletters.cho.sh

import requests
import datetime
import os
import frontmatter
from pytz import timezone
from dotenv import load_dotenv
from resend import Resend  # for notification

load_dotenv()

server = "https://newsletters.cho.sh/api/campaigns"
username = os.environ["NEWSLETTERS_CHO_SH_USERNAME"]
password = os.environ["NEWSLETTERS_CHO_SH_PASSWORD"]
resend = Resend(os.environ["RESEND_KEY"])  # Just for me
notification = ""

CONFIG = {
    "ko": {
        "audience": 3,
        "time": "T01:00:00Z",  # 10 AM KST
        "Read More": "cho.sh에서 원본 읽기",
    },
    "en": {
        "audience": 4,
        "time": "T17:00:00Z",  # 10 AM LA time, 1 PM NYC time, 5 PM London time
        "Read More": "Read the original text on cho.sh",
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
    tomorrow = (datetime.datetime.utcnow() + datetime.timedelta(days=1)).strftime(
        "%Y-%m-%d"
    )
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
            and (post["newsletter"] == today or post["newsletter"] == tomorrow)
            and post["lang"] == lang
        ):
            title = ".".join(md_file.split("/")[-1].split(".")[:-1])
            content = process_content(post.content, post["slug"], lang)
            newsletters.append((title, content))
    return newsletters


def process_content(body, slug, lang):
    body += f"\n\n[{CONFIG[lang]['Read More']}](https://cho.sh/{lang if lang != 'en' else ''}/research/{slug})"
    return body


def collect_device_info():
    import platform
    import psutil

    collect_notification("\n\n\nCollecting device information...")
    uname = platform.uname()
    collect_notification(f"System: {uname.system}")
    collect_notification(f"Node Name: {uname.node}")
    collect_notification(f"Release: {uname.release}")
    collect_notification(f"Version: {uname.version}")
    collect_notification(f"Machine: {uname.machine}")
    collect_notification(f"Processor: {uname.processor}")
    collect_notification("Physical cores:", psutil.cpu_count(logical=False))
    collect_notification("Total cores:", psutil.cpu_count(logical=True))
    cpufreq = psutil.cpu_freq()
    collect_notification(f"Max Frequency: {cpufreq.max:.2f}Mhz")
    collect_notification(f"Min Frequency: {cpufreq.min:.2f}Mhz")
    collect_notification(f"Current Frequency: {cpufreq.current:.2f}Mhz")
    collect_notification(f"Total CPU Usage: {psutil.cpu_percent()}%")


def notify(title, text):
    """Notify me about newsletter results."""
    resend.send_email(
        sender="notification@resend.dev",
        to="hey@cho.sh",
        subject=title,
        text=text,
    )


def collect_notification(*args):
    args = [str(arg) for arg in args]
    text = " ".join(args)
    """Collect notifications and send them at the end."""
    global notification
    notification += text + "\n"


def schedule_newsletter(lang):
    """Schedule the newsletter for today."""
    newsletters = find_today_newsletters(lang)
    if newsletters:
        campaigns = get_campaigns()["data"]["results"]
        for title, post in newsletters:
            duplicate = False
            for campaign in campaigns:
                if title in campaign["name"]:
                    collect_notification("Duplicate... ", title)
                    duplicate = True
            if not duplicate:
                collect_notification("Scheduling... ", title)
                create_campaign(title, post, lang)
    else:
        collect_notification("No newsletter for today.")


schedule_newsletter("en")
schedule_newsletter("ko")
collect_device_info()

notify(
    f"Newsletter Job {datetime.datetime.now().astimezone(timezone('US/Pacific')).strftime('%Y-%m-%d %H:%M:%S')}",
    notification,
)
